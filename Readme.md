# KorWork CV Analyzer

Herramienta que analiza un CV en PDF, detecta tecnologías y busca vacantes reales en múltiples portales de empleo.

## Demo

**[KorWork CV Analyzer](https://cv.korwork.org/)**

## ¿Cómo funciona?

1. Sube tu CV en PDF — se procesa localmente en el navegador, nada se envía a servidores
2. Se detectan automáticamente tus tecnologías y se mapean a roles del mercado
3. Se buscan vacantes activas en LinkedIn, Indeed, OCC, Computrabajo y GetOnBrd
4. Cada card muestra vacantes reales con descripción, empresa, modalidad y link directo

## Stack

- **Frontend** — HTML, Tailwind CSS, JavaScript (ES Modules)
- **PDF parsing** — pdf.js (cliente)
- **Backend** — Node.js + Express
- **Scraping** — fetch nativo, parsers por portal
- **Deploy** — Vercel

## Estructura

```
CV_Analyzer/
├── api/
│   └── get-job-listings.js     # Scraper de portales de empleo
├── src/
│   ├── presentation/
│   │   ├── html/
│   │   │   └── index.html      # UI principal
│   │   ├── Styles/
│   │   │   └── style.css
│   │   └── web-app.js          # Lógica del frontend
│   ├── data/
│   │   ├── WebPdfRepository.js # Parser de PDF (browser)
│   │   └── PdfCVRepository.js  # Parser de PDF (Node)
│   └── core/
│       ├── use-cases/
│       │   └── AnalyzeResume.js
│       ├── entities/
│       │   └── Candidate.js
│       └── repositories/
│           └── CVRepository.js
├── server.js                   # Servidor Express
├── vercel.json                 # Configuración de deploy
└── package.json
```

## Correr localmente

```bash
# Instalar dependencias
npm install

# Iniciar servidor
node server.js

# Abrir en el navegador
http://localhost:3000
```

## Deploy

El proyecto se despliega automáticamente en Vercel al hacer push a `main`.

```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

Vercel detecta el push y redeploya en ~30 segundos.

## Portales de empleo

| Portal       | Método       | Vacantes reales |
|--------------|--------------|-----------------|
| LinkedIn     | Feed público | ✅              |
| Indeed       | RSS público  | ✅              |
| OCC Mundial  | HTML         | ✅              |
| Computrabajo | HTML         | ✅              |
| GetOnBrd     | JSON API     | ✅              |

## Autor

**Carlos García Huerta** — [KorWork.org](https://korwork.org) · 2026