import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getJobListings } from "./api/get-job-listings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
app.use(express.json());

// ── Archivos estáticos ────────────────────────────────────────
// El HTML vive en src/presentation/html/index.html
// y usa rutas relativas como:
//   ../Styles/style.css   → /Styles/style.css
//   ../web-app.js         → /web-app.js
//   ../../data/...        → /data/...  (NO, los imports de JS usan rutas del módulo)

// Servir src/presentation/ en la raíz (cubre Styles/ y web-app.js)
app.use(express.static(path.join(__dirname, "src", "presentation")));

// Servir src/ en la raíz (cubre data/, core/, entities/)
// Esto hace que /data/WebPdfRepository.js funcione
app.use(express.static(path.join(__dirname, "src")));

// ── Ruta raíz → index.html ────────────────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "presentation", "html", "index.html"), err => {
    if (err) res.status(500).send(`Error: ${err.message}`);
  });
});

// ── API ───────────────────────────────────────────────────────
app.get("/api/get-job-listings", async (req, res) => {
  await getJobListings(req, res);
});

// ── Servidor ─────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ KorWork en http://localhost:${PORT}`);
});

export default app;