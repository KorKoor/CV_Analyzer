// api/ats-analyze.js
// Serverless function en Vercel — Gemini (gratis)
// Variable requerida: GEMINI_API_KEY (aistudio.google.com/apikey)

export const config = { maxDuration: 60 };

// ── Caché en memoria ──────────────────────────────────────────────
const analysisCache = new Map();
const CACHE_TTL_MS  = 10 * 60 * 1000; // 10 minutos

function getCacheKey(cvText) {
  let hash = 0;
  for (let i = 0; i < Math.min(cvText.length, 500); i++) {
    hash = ((hash << 5) - hash) + cvText.charCodeAt(i);
    hash |= 0;
  }
  return `ats_${hash}`;
}

// ── Modelos en orden — si uno falla por rate limit prueba el siguiente ──
const MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash-8b',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Método no permitido' });

  // Parsear body
  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch { body = {}; }
  }

  const { cvText, fileName, forceRefresh } = body || {};
  if (!cvText?.trim()) return res.status(400).json({ error: 'Falta el texto del CV' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)  return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en Vercel → Settings → Environment Variables' });

  // Revisar caché
  const cacheKey = getCacheKey(cvText);
  if (!forceRefresh && analysisCache.has(cacheKey)) {
    const cached = analysisCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json(cached.data);
    }
    analysisCache.delete(cacheKey);
  }

  // Limpiar y truncar CV
  const cleanCV = cvText
    .replace(/\s{3,}/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .trim()
    .substring(0, 4000);

  const prompt = buildPrompt(cleanCV, fileName);

  // Probar modelos en cadena
  let lastError = null;

  for (const model of MODELS) {
    try {
      const result = await callGemini(apiKey, model, prompt);

      if (result.error) {
        if (result.status === 429 || result.status === 404) {
          lastError = result;
          await sleep(300);
          continue;
        }
        return res.status(502).json(result);
      }

      // Éxito
      analysisCache.set(cacheKey, { data: result, timestamp: Date.now() });
      res.setHeader('X-Cache', 'MISS');
      res.setHeader('X-Model-Used', model);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(result);

    } catch (err) {
      lastError = { error: err.message };
      if (err.name === 'AbortError') break;
    }
  }

  return res.status(502).json(
    lastError?.status === 429
      ? { error: 'Todos los modelos de Gemini están con rate limit. Espera 2 minutos e intenta de nuevo.' }
      : (lastError || { error: 'No se pudo conectar con Gemini' })
  );
}

async function callGemini(apiKey, model, prompt) {
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        signal:  controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature:      0.2,
            maxOutputTokens:  2048,
            responseMimeType: 'application/json',
            candidateCount:   1,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ],
        }),
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      let errMsg = errText;
      try { errMsg = JSON.parse(errText)?.error?.message || errText; } catch {}

      const friendly = {
        400: 'API key inválida o request malformado',
        401: 'API key incorrecta — verifica en aistudio.google.com/apikey',
        403: 'API key sin permisos — activa Gemini API en Google Cloud Console',
        404: `Modelo ${model} no disponible, probando siguiente...`,
        429: 'Límite de requests alcanzado, probando modelo alternativo...',
        500: 'Error interno de Gemini',
        503: 'Gemini no disponible temporalmente',
      };

      return { error: friendly[response.status] || `Error ${response.status}`, detail: errMsg, status: response.status, model };
    }

    const data    = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!rawText) {
      const reason = data.candidates?.[0]?.finishReason || data.promptFeedback?.blockReason;
      return { error: reason ? `Gemini bloqueó: ${reason}` : 'Respuesta vacía', status: 502 };
    }

    let analysis;
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : rawText.replace(/```json|```/g, '').trim());
    } catch {
      return { error: 'JSON inválido de Gemini — intenta de nuevo', raw: rawText.substring(0, 300), status: 502 };
    }

    // Validar estructura mínima
    if (typeof analysis.score !== 'number') analysis.score = 50;
    if (!Array.isArray(analysis.categories))  analysis.categories = [];
    if (!Array.isArray(analysis.suggestions)) analysis.suggestions = [];
    if (!analysis.keywords) analysis.keywords = { present: [], missing: [], suggested: [] };

    return analysis;

  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

function buildPrompt(cvText, fileName) {
  return `Eres un experto certificado en sistemas ATS y optimización de CVs para el mercado laboral de México y LATAM.

INSTRUCCIONES CRÍTICAS:
- Responde ÚNICAMENTE con JSON válido. Sin texto antes ni después. Sin backticks. Sin comentarios.
- Sé ESPECÍFICO al CV analizado. Nunca uses frases genéricas.
- Score HONESTO: promedio = 45-60, solo excepcionales llegan a 85+.
- Todo en ESPAÑOL.

CV (${fileName || 'CV.pdf'}):
"""
${cvText}
"""

JSON de respuesta:
{
  "score": 0,
  "scoreLabel": "Necesita mejora",
  "scoreSummary": "2-3 oraciones honestas del estado real del CV",
  "quickWins": ["fortaleza 1", "fortaleza 2", "fortaleza 3"],
  "categories": [
    { "name": "Información de Contacto",     "icon": "📋", "score": 0, "items": [{ "status": "pass", "text": "obs específica" },{ "status": "warn", "text": "obs específica" },{ "status": "fail", "text": "obs específica" }] },
    { "name": "Perfil Profesional",           "icon": "👤", "score": 0, "items": [{ "status": "pass", "text": "obs específica" },{ "status": "warn", "text": "obs específica" },{ "status": "fail", "text": "obs específica" }] },
    { "name": "Experiencia Laboral",          "icon": "💼", "score": 0, "items": [{ "status": "pass", "text": "obs específica" },{ "status": "warn", "text": "obs específica" },{ "status": "fail", "text": "obs específica" }] },
    { "name": "Educación y Certificaciones",  "icon": "🎓", "score": 0, "items": [{ "status": "pass", "text": "obs específica" },{ "status": "warn", "text": "obs específica" },{ "status": "fail", "text": "obs específica" }] },
    { "name": "Habilidades Técnicas",         "icon": "🔑", "score": 0, "items": [{ "status": "pass", "text": "obs específica" },{ "status": "warn", "text": "obs específica" },{ "status": "fail", "text": "obs específica" }] },
    { "name": "Logros y Métricas",            "icon": "📊", "score": 0, "items": [{ "status": "pass", "text": "obs específica" },{ "status": "warn", "text": "obs específica" },{ "status": "fail", "text": "obs específica" }] },
    { "name": "Formato ATS",                  "icon": "🤖", "score": 0, "items": [{ "status": "pass", "text": "obs ATS específica" },{ "status": "warn", "text": "obs específica" },{ "status": "fail", "text": "obs específica" }] }
  ],
  "suggestions": [
    { "priority": "critical",  "icon": "🚨", "title": "título", "description": "qué hacer, cómo, por qué importa para ATS" },
    { "priority": "critical",  "icon": "📝", "title": "título", "description": "descripción accionable" },
    { "priority": "critical",  "icon": "🎯", "title": "título", "description": "descripción accionable" },
    { "priority": "important", "icon": "⚡", "title": "título", "description": "descripción accionable" },
    { "priority": "important", "icon": "📈", "title": "título", "description": "descripción accionable" },
    { "priority": "important", "icon": "💡", "title": "título", "description": "descripción accionable" },
    { "priority": "nice",      "icon": "✨", "title": "título", "description": "descripción accionable" },
    { "priority": "nice",      "icon": "🌟", "title": "título", "description": "descripción accionable" }
  ],
  "keywords": {
    "present":   ["k1","k2","k3","k4","k5"],
    "missing":   ["k1","k2","k3","k4","k5"],
    "suggested": ["k1","k2","k3","k4","k5"]
  },
  "atsCompatibility": {
    "score":  0,
    "issues": ["problema ATS 1","problema ATS 2"],
    "passed": ["aspecto positivo ATS 1","aspecto positivo ATS 2"]
  },
  "salaryInsight": {
    "estimatedRange":  "rango MXN mensual bruto ej: $18,000 - $25,000",
    "marketPosition":  "Junior|Mid|Senior|Lead",
    "basis":           "justificación basada en el CV"
  }
}

Criterios score: 0-40 graves, 41-60 promedio, 61-75 bueno, 76-90 sólido, 91-100 excepcional.
Formato ATS: evalúa tablas, columnas, imágenes, fuentes raras, secciones etiquetadas, extensión (1-2 páginas ideal).
Logros: verbos de acción + números cuantificables.
Salary: mercado mexicano 2024-2025.`;
}