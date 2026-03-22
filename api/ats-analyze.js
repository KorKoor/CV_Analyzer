// api/ats-analyze.js
// Serverless function en Vercel — llama a Gemini 1.5 Flash (gratis)
// Variable de entorno requerida: GEMINI_API_KEY

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { cvText, fileName } = req.body || {};
  if (!cvText?.trim()) return res.status(400).json({ error: 'Falta el texto del CV' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });

  const prompt = buildPrompt(cvText, fileName);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature:     0.3,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: `Gemini error: ${response.status}`, detail: err });
    }

    const data     = await response.json();
    const rawText  = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let analysis;
    try {
      const clean = rawText.replace(/```json|```/g, '').trim();
      analysis = JSON.parse(clean);
    } catch {
      return res.status(502).json({ error: 'No se pudo parsear la respuesta de Gemini', raw: rawText });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(analysis);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// ─────────────────────────────────────────────────────────
function buildPrompt(cvText, fileName) {
  return `Eres un experto en sistemas ATS (Applicant Tracking Systems) y optimización de CVs para el mercado laboral de México y LATAM.

Analiza el siguiente CV y responde ÚNICAMENTE con un objeto JSON válido. Sin texto adicional, sin backticks, sin explicaciones fuera del JSON.

CV A ANALIZAR (archivo: ${fileName || 'CV.pdf'}):
"""
${cvText.substring(0, 5000)}
"""

Responde con este JSON exacto (respeta la estructura):
{
  "score": <número entero del 0 al 100>,
  "scoreLabel": "<Excelente|Muy bueno|Bueno|Regular|Necesita mejora>",
  "scoreSummary": "<2-3 oraciones resumiendo el estado del CV de forma honesta>",
  "quickWins": ["<etiqueta corta de fortaleza 1>", "<etiqueta corta 2>", "<etiqueta corta 3>"],
  "categories": [
    {
      "name": "Información de Contacto",
      "icon": "📋",
      "score": <0-100>,
      "items": [
        { "status": "pass", "text": "<observación positiva específica>" },
        { "status": "warn", "text": "<observación de mejora específica>" },
        { "status": "fail", "text": "<problema crítico específico>" }
      ]
    },
    {
      "name": "Estructura y Formato",
      "icon": "📐",
      "score": <0-100>,
      "items": [
        { "status": "pass|warn|fail", "text": "<observación específica del CV>" }
      ]
    },
    {
      "name": "Experiencia Laboral",
      "icon": "💼",
      "score": <0-100>,
      "items": [
        { "status": "pass|warn|fail", "text": "<observación específica del CV>" }
      ]
    },
    {
      "name": "Educación",
      "icon": "🎓",
      "score": <0-100>,
      "items": [
        { "status": "pass|warn|fail", "text": "<observación específica del CV>" }
      ]
    },
    {
      "name": "Habilidades y Keywords",
      "icon": "🔑",
      "score": <0-100>,
      "items": [
        { "status": "pass|warn|fail", "text": "<observación específica del CV>" }
      ]
    },
    {
      "name": "Logros y Métricas",
      "icon": "📊",
      "score": <0-100>,
      "items": [
        { "status": "pass|warn|fail", "text": "<observación específica del CV>" }
      ]
    }
  ],
  "suggestions": [
    {
      "priority": "critical",
      "icon": "🚨",
      "title": "<título corto y accionable>",
      "description": "<qué hacer exactamente, en 1-2 oraciones>"
    },
    {
      "priority": "critical",
      "icon": "📝",
      "title": "<título>",
      "description": "<descripción accionable>"
    },
    {
      "priority": "critical",
      "icon": "💡",
      "title": "<título>",
      "description": "<descripción accionable>"
    },
    {
      "priority": "important",
      "icon": "⚡",
      "title": "<título>",
      "description": "<descripción accionable>"
    },
    {
      "priority": "important",
      "icon": "🎯",
      "title": "<título>",
      "description": "<descripción accionable>"
    },
    {
      "priority": "important",
      "icon": "📈",
      "title": "<título>",
      "description": "<descripción accionable>"
    },
    {
      "priority": "nice",
      "icon": "✨",
      "title": "<título>",
      "description": "<descripción accionable>"
    },
    {
      "priority": "nice",
      "icon": "🌟",
      "title": "<título>",
      "description": "<descripción accionable>"
    }
  ],
  "keywords": {
    "present": ["<keyword ATS que ya está en el CV>"],
    "missing": ["<keyword ATS importante que NO está en el CV>"],
    "suggested": ["<keyword recomendada para agregar según el perfil>"]
  }
}

Reglas importantes:
- Sé 100% específico al CV analizado, no genérico
- El score debe ser HONESTO, no inflado
- Suggestions "critical" = bloquean el paso por ATS
- Suggestions "important" = mejoran significativamente el score
- Suggestions "nice" = detalles de pulido
- Keywords deben ser relevantes al perfil detectado en el CV
- Mínimo 3 items por categoría
- Mínimo 5 keywords en cada sección de keywords
- Responde TODO en español`;
}