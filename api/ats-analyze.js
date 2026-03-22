// api/ats-analyze.js
// Serverless function en Vercel — Gemini 1.5 Flash (gratis)
// Variable requerida: GEMINI_API_KEY (aistudio.google.com/apikey)

// Vercel: aumentar timeout máximo en plan hobby (60s)
export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Método no permitido' });

  // ── Validar body ──────────────────────────────────────────
  let body = req.body;
  if (!body && req.readable) {
    // Express puede no parsear el body si falta bodyParser
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    try { body = JSON.parse(Buffer.concat(chunks).toString()); } catch { body = {}; }
  }

  const { cvText, fileName } = body || {};
  if (!cvText?.trim()) return res.status(400).json({ error: 'Falta el texto del CV' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)  return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en Vercel → Settings → Environment Variables' });

  // ── Limpiar y truncar texto del CV ────────────────────────
  const cleanCV = cvText
    .replace(/\s{3,}/g, '\n')   // colapsar espacios excesivos
    .replace(/[^\S\n]+/g, ' ')  // espacios múltiples → uno
    .trim()
    .substring(0, 4000);        // límite seguro para no exceder tokens

  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 50000); // 50s timeout

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        signal:  controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(cleanCV, fileName) }] }],
          generationConfig: {
            temperature:      0.2,   // más determinístico = JSON más consistente
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

    // ── Manejar errores HTTP de Gemini ────────────────────────
    if (!geminiRes.ok) {
      const errText = await geminiRes.text().catch(() => '');
      let errDetail = errText;
      try { errDetail = JSON.parse(errText)?.error?.message || errText; } catch {}

      // Mensajes de error amigables
      const friendlyErrors = {
        400: 'API key inválida o request malformado',
        401: 'API key incorrecta — verifica en aistudio.google.com/apikey',
        403: 'API key sin permisos — activa la API de Gemini en Google Cloud',
        429: 'Límite de requests alcanzado — espera 1 minuto e intenta de nuevo',
        500: 'Error interno de Gemini — intenta de nuevo en unos segundos',
        503: 'Gemini no disponible temporalmente — intenta de nuevo',
      };

      return res.status(502).json({
        error:  friendlyErrors[geminiRes.status] || `Gemini respondió con error ${geminiRes.status}`,
        detail: errDetail,
        status: geminiRes.status,
      });
    }

    const data = await geminiRes.json();

    // ── Extraer texto de la respuesta ─────────────────────────
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!rawText) {
      const blockReason = data.candidates?.[0]?.finishReason || data.promptFeedback?.blockReason;
      return res.status(502).json({
        error: blockReason
          ? `Gemini bloqueó la respuesta: ${blockReason}`
          : 'Gemini devolvió una respuesta vacía',
      });
    }

    // ── Parsear JSON ──────────────────────────────────────────
    let analysis;
    try {
      // Limpiar posibles backticks o texto extra alrededor del JSON
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      const clean     = jsonMatch ? jsonMatch[0] : rawText.replace(/```json|```/g, '').trim();
      analysis = JSON.parse(clean);
    } catch (parseErr) {
      return res.status(502).json({
        error: 'Gemini no devolvió JSON válido — intenta de nuevo',
        raw:   rawText.substring(0, 500),
      });
    }

    // ── Validar estructura mínima ─────────────────────────────
    if (typeof analysis.score !== 'number') {
      analysis.score = 50;
    }
    if (!Array.isArray(analysis.categories)) {
      analysis.categories = [];
    }
    if (!Array.isArray(analysis.suggestions)) {
      analysis.suggestions = [];
    }
    if (!analysis.keywords) {
      analysis.keywords = { present: [], missing: [], suggested: [] };
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(analysis);

  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Tiempo de espera agotado — el análisis tardó demasiado, intenta de nuevo' });
    }
    return res.status(500).json({ error: `Error interno: ${err.message}` });
  }
}

// ═══════════════════════════════════════════════════════════
// PROMPT — optimizado para JSON consistente
// ═══════════════════════════════════════════════════════════
function buildPrompt(cvText, fileName) {
  return `Eres un experto certificado en sistemas ATS (Applicant Tracking Systems), reclutamiento y optimización de CVs para el mercado laboral de México y LATAM.

Tu tarea es analizar el CV proporcionado y devolver un objeto JSON con evaluación detallada, honesta y accionable.

INSTRUCCIONES CRÍTICAS:
- Responde ÚNICAMENTE con JSON válido. Sin texto antes ni después. Sin backticks. Sin comentarios.
- Sé ESPECÍFICO al CV analizado. Nunca uses frases genéricas como "agrega más información".
- El score debe ser HONESTO. Un CV promedio tiene score 45-60. Solo los excepcionales llegan a 85+.
- Todas las respuestas en ESPAÑOL.

CV A ANALIZAR (${fileName || 'CV.pdf'}):
"""
${cvText}
"""

RESPONDE CON ESTE JSON (sin modificar la estructura):
{
  "score": 0,
  "scoreLabel": "Necesita mejora",
  "scoreSummary": "descripción honesta de 2-3 oraciones del estado real del CV",
  "quickWins": ["fortaleza 1", "fortaleza 2", "fortaleza 3"],
  "categories": [
    {
      "name": "Información de Contacto",
      "icon": "📋",
      "score": 0,
      "items": [
        { "status": "pass", "text": "observación positiva específica" },
        { "status": "warn", "text": "observación de mejora específica" },
        { "status": "fail", "text": "problema crítico específico" }
      ]
    },
    {
      "name": "Perfil Profesional",
      "icon": "👤",
      "score": 0,
      "items": [
        { "status": "pass", "text": "observación específica" },
        { "status": "warn", "text": "observación específica" },
        { "status": "fail", "text": "observación específica" }
      ]
    },
    {
      "name": "Experiencia Laboral",
      "icon": "💼",
      "score": 0,
      "items": [
        { "status": "pass", "text": "observación específica" },
        { "status": "warn", "text": "observación específica" },
        { "status": "fail", "text": "observación específica" }
      ]
    },
    {
      "name": "Educación y Certificaciones",
      "icon": "🎓",
      "score": 0,
      "items": [
        { "status": "pass", "text": "observación específica" },
        { "status": "warn", "text": "observación específica" },
        { "status": "fail", "text": "observación específica" }
      ]
    },
    {
      "name": "Habilidades Técnicas",
      "icon": "🔑",
      "score": 0,
      "items": [
        { "status": "pass", "text": "observación específica" },
        { "status": "warn", "text": "observación específica" },
        { "status": "fail", "text": "observación específica" }
      ]
    },
    {
      "name": "Logros y Métricas",
      "icon": "📊",
      "score": 0,
      "items": [
        { "status": "pass", "text": "observación específica" },
        { "status": "warn", "text": "observación específica" },
        { "status": "fail", "text": "observación específica" }
      ]
    },
    {
      "name": "Formato ATS",
      "icon": "🤖",
      "score": 0,
      "items": [
        { "status": "pass", "text": "observación específica sobre compatibilidad ATS" },
        { "status": "warn", "text": "observación específica" },
        { "status": "fail", "text": "observación específica" }
      ]
    }
  ],
  "suggestions": [
    {
      "priority": "critical",
      "icon": "🚨",
      "title": "título corto accionable",
      "description": "qué hacer exactamente, cómo hacerlo, por qué importa para ATS"
    },
    {
      "priority": "critical",
      "icon": "📝",
      "title": "título",
      "description": "descripción accionable específica"
    },
    {
      "priority": "critical",
      "icon": "🎯",
      "title": "título",
      "description": "descripción accionable específica"
    },
    {
      "priority": "important",
      "icon": "⚡",
      "title": "título",
      "description": "descripción accionable específica"
    },
    {
      "priority": "important",
      "icon": "📈",
      "title": "título",
      "description": "descripción accionable específica"
    },
    {
      "priority": "important",
      "icon": "💡",
      "title": "título",
      "description": "descripción accionable específica"
    },
    {
      "priority": "nice",
      "icon": "✨",
      "title": "título",
      "description": "descripción accionable específica"
    },
    {
      "priority": "nice",
      "icon": "🌟",
      "title": "título",
      "description": "descripción accionable específica"
    }
  ],
  "keywords": {
    "present": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "missing": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "suggested": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
  },
  "atsCompatibility": {
    "score": 0,
    "issues": ["problema ATS específico 1", "problema ATS específico 2"],
    "passed": ["aspecto positivo ATS 1", "aspecto positivo ATS 2"]
  },
  "salaryInsight": {
    "estimatedRange": "rango salarial estimado en MXN según el perfil detectado",
    "marketPosition": "Junior|Mid|Senior|Lead",
    "basis": "en qué te basas para esta estimación"
  }
}

CRITERIOS DE EVALUACIÓN:
- score 0-40: CV con problemas graves, pasará ATS difícilmente
- score 41-60: CV promedio, mejoras necesarias
- score 61-75: Buen CV con áreas de mejora
- score 76-90: CV sólido y competitivo
- score 91-100: CV excepcional (menos del 5% llega aquí)

Para "Formato ATS" evalúa: ausencia de tablas, columnas múltiples, headers/footers, imágenes, fuentes raras, uso de secciones claramente etiquetadas, extensión apropiada.

Para "Logros y Métricas" evalúa si los bullets usan verbos de acción + números/impacto cuantificable.

Para salaryInsight usa el mercado mexicano actual (2024-2025).`;
}