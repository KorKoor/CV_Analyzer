import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getJobListings } from "./api/get-job-listings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// Estructura real del proyecto:
// src/presentation/html/index.html      ← página principal
// src/presentation/Styles/style.css     ← estilos
// src/presentation/web-app.js           ← app JS
// src/data/                             ← repositorios
// src/core/                             ← use cases, entities

// El HTML usa rutas relativas como:
//   ../Styles/style.css  → necesita /Styles/style.css
//   ../web-app.js        → necesita /web-app.js
// Por eso servimos src/presentation/ como raíz estática

app.use(express.static(path.join(__dirname, "src", "presentation")));

// También servimos src/ para que los imports de módulos funcionen:
//   ../data/WebPdfRepository.js  → /data/WebPdfRepository.js
//   ../core/use-cases/...        → /core/use-cases/...
app.use(express.static(path.join(__dirname, "src")));

// ── Ruta raíz → index.html ────────────────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "presentation", "html", "index.html"));
});

// ── API ───────────────────────────────────────────────────────
app.get("/api/get-job-listings", async (req, res) => {
  await getJobListings(req, res);
});

// ── Servidor ─────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ KorWork en http://localhost:${PORT}`);
  console.log(`🔍 API:      http://localhost:${PORT}/api/get-job-listings?title=Android+Developer&location=Mexico`);
});