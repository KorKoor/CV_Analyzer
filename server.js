import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getJobListings } from "./api/get-job-listings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
app.use(express.json());

// ── Archivos estáticos ────────────────────────────────────────
// Vercel corre el server desde la raíz del proyecto
// así que estas rutas funcionan tanto local como en producción
app.use("/Styles",  express.static(path.join(__dirname, "src", "presentation", "Styles")));
app.use("/styles",  express.static(path.join(__dirname, "src", "presentation", "Styles")));
app.use("/src",     express.static(path.join(__dirname, "src")));

// web-app.js vive en src/presentation/ y el HTML lo pide como ../web-app.js
// desde html/ eso se resuelve a /web-app.js
app.use("/", express.static(path.join(__dirname, "src", "presentation")));

// ── Ruta raíz → index.html ────────────────────────────────────
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "src", "presentation", "html", "index.html");
  res.sendFile(indexPath, err => {
    if (err) {
      console.error("Error sirviendo index.html:", err);
      res.status(500).send(`Error: no se encontró index.html en ${indexPath}`);
    }
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