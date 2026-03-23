// api/get-job-listings.js
// Compatible con Express (server.js) Y Vercel serverless
// ─────────────────────────────────────────────────────────────

const enc = (s) => encodeURIComponent(String(s || ""));
const slug = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
const num = (n) => Number(n).toLocaleString("es-MX");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── DICCIONARIO DE DOMINIOS INTERNACIONALES ───────────────────
function getDomains(location) {
  const loc = String(location || "").toLowerCase();
  let i = "mx.indeed.com",
    c = "mx.computrabajo.com"; // Default a MX

  if (loc.includes("argentina")) {
    i = "ar.indeed.com";
    c = "ar.computrabajo.com";
  } else if (loc.includes("colombia")) {
    i = "co.indeed.com";
    c = "co.computrabajo.com";
  } else if (loc.includes("chile")) {
    i = "cl.indeed.com";
    c = "cl.computrabajo.com";
  } else if (loc.includes("perú") || loc.includes("peru")) {
    i = "pe.indeed.com";
    c = "pe.computrabajo.com";
  } else if (loc.includes("brasil") || loc.includes("brazil")) {
    i = "br.indeed.com";
    c = "br.computrabajo.com";
  } else if (loc.includes("uruguay")) {
    i = "uy.indeed.com";
    c = "uy.computrabajo.com";
  } else if (loc.includes("ecuador")) {
    i = "ec.indeed.com";
    c = "ec.computrabajo.com";
  } else if (loc.includes("bolivia")) {
    i = "bo.indeed.com";
    c = "bo.computrabajo.com";
  } else if (loc.includes("paraguay")) {
    i = "py.indeed.com";
    c = "py.computrabajo.com";
  } else if (loc.includes("venezuela")) {
    i = "ve.indeed.com";
    c = "ve.computrabajo.com";
  } else if (loc.includes("costa rica")) {
    i = "cr.indeed.com";
    c = "cr.computrabajo.com";
  } else if (loc.includes("panamá") || loc.includes("panama")) {
    i = "pa.indeed.com";
    c = "pa.computrabajo.com";
  } else if (loc.includes("guatemala")) {
    i = "gt.indeed.com";
    c = "gt.computrabajo.com";
  } else if (loc.includes("el salvador")) {
    i = "sv.indeed.com";
    c = "sv.computrabajo.com";
  } else if (loc.includes("honduras")) {
    i = "hn.indeed.com";
    c = "hn.computrabajo.com";
  } else if (loc.includes("nicaragua")) {
    i = "ni.indeed.com";
    c = "ni.computrabajo.com";
  } else if (loc.includes("dominicana")) {
    i = "do.indeed.com";
    c = "do.computrabajo.com";
  } else if (loc.includes("puerto rico")) {
    i = "pr.indeed.com";
    c = "pr.computrabajo.com";
  } else if (
    loc.includes("estados unidos") ||
    loc.includes("usa") ||
    loc.includes("remote usa")
  ) {
    i = "www.indeed.com";
    c = "www.computrabajo.com";
  } else if (loc.includes("canadá") || loc.includes("canada")) {
    i = "ca.indeed.com";
    c = "www.computrabajo.com";
  }

  return { indeed: i, computrabajo: c, isMexico: i === "mx.indeed.com" };
}

// ─────────────────────────────────────────────────────────────

function cleanText(str) {
  return (
    str
      ?.replace(/<[^>]+>/g, "")
      .replace(/&[a-z#0-9]+;/gi, (c) => {
        const map = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'",
          "&nbsp;": " ",
          "&#xF3;": "ó",
          "&#xE9;": "é",
          "&#xED;": "í",
          "&#xE1;": "á",
          "&#xFA;": "ú",
          "&#xF1;": "ñ",
        };
        return map[c] || c;
      })
      .replace(/\s+/g, " ")
      .trim() || null
  );
}
function extractTag(html, tag, cls) {
  const p = cls
    ? new RegExp(
        `<${tag}[^>]*class="[^"]*${cls}[^"]*"[^>]*>(.*?)<\\/${tag}>`,
        "is",
      )
    : new RegExp(`<${tag}[^>]*>(.*?)<\\/${tag}>`, "is");
  return (
    html
      ?.match(p)?.[1]
      ?.replace(/<[^>]+>/g, "")
      .trim() || null
  );
}
function extractAttr(html, tag, attr) {
  return (
    html?.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, "i"))?.[1] ||
    null
  );
}
function extractRawTag(html, tag) {
  return (
    html?.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1] ||
    null
  );
}
function stripCDATA(str) {
  return str?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim() || null;
}
function extractSalary(text = "") {
  return (
    text.match(
      /\$[\d,]+\s*(?:–|-|a)\s*\$[\d,]+(?:\s*(?:MXN|pesos|mensual))?/i,
    )?.[0] ||
    text.match(/\$[\d,.]+\s*(?:MXN|pesos|mensual)/i)?.[0] ||
    null
  );
}
function detectModality(text = "") {
  const t = text.toLowerCase();
  if (/remoto|remote|home.?office|teletrabajo/.test(t)) return "Remoto";
  if (/h[íi]brido|hybrid/.test(t)) return "Híbrido";
  if (/presencial|on.?site|oficina/.test(t)) return "Presencial";
  return null;
}
function relativeDate(str) {
  if (!str) return null;
  try {
    const d = new Date(str);
    if (isNaN(d)) return null;
    const diff = Math.floor((Date.now() - d) / 86400000);
    if (diff === 0) return "Hoy";
    if (diff === 1) return "Ayer";
    if (diff <= 7) return `Hace ${diff} días`;
    if (diff <= 30) return `Hace ${Math.floor(diff / 7)} sem.`;
    return null;
  } catch {
    return null;
  }
}

function cleanDescription(raw, maxLen = 180) {
  if (!raw) return null;
  const text = cleanText(raw);
  if (!text) return null;
  return text.length > maxLen
    ? text.substring(0, maxLen).trimEnd() + "..."
    : text;
}

function syntheticJob(title, location, source, url) {
  return {
    title,
    company: null,
    location,
    url,
    postedAt: null,
    modality: null,
    salary: null,
    description: null,
    source,
    synthetic: true,
  };
}

function buildSearchUrl(name, title, location) {
  const q = enc(title),
    l = enc(location),
    s = slug(title);

  // Extraemos el slug de la ciudad (ej: "Aguascalientes, México" -> "aguascalientes")
  const locName = String(location).split(",")[0].trim();
  const locSlug = slug(locName);

  const dom = getDomains(location);

  switch (name) {
    case "LinkedIn":
      return `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${l}&f_TPR=r604800&sortBy=DD`;

    case "Indeed":
      return `https://${dom.indeed}/jobs?q=${q}&l=${l}&fromage=7&sort=date`;

    case "OCC Mundial":
      // Forzamos el loc=${l} siempre, para que no ignore la ciudad en México
      return `https://www.occ.com.mx/empleos/de-${s}/?loc=${l}${dom.isMexico ? "" : "&q=" + q}`;

    case "Computrabajo":
      // Cambiamos la ruta simple por la ruta de ciudad: /trabajo-de-[puesto]-en-[ciudad]
      return `https://${dom.computrabajo}/trabajo-de-${s}-en-${locSlug}`;

    case "GetOnBrd":
      // GetOnBrd funciona mejor sumando la ciudad al query de búsqueda
      return `https://www.getonbrd.com/jobs/programming?search=${q}+${l}`;

    default:
      return `https://www.google.com/search?q=${q}+${l}+empleos&ibp=htl;jobs`;
  }
}

// ── FETCH ─────────────────────────────────────────────────────
async function fetchSafe(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "text/html,application/xml,application/json;q=0.9,*/*;q=0.8",
          "Accept-Language": "es-MX,es;q=0.9,en;q=0.8",
          "Cache-Control": "no-cache",
        },
        redirect: "follow",
      });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch {
      if (attempt === 1) return null;
      await sleep(400);
    }
  }
  return null;
}

// ── PARSERS ───────────────────────────────────────────────────

function parseLinkedin(html, title, location) {
  if (!html)
    return [
      syntheticJob(
        title,
        location,
        "LinkedIn",
        buildSearchUrl("LinkedIn", title, location),
      ),
    ];
  const jobs = [];

  for (const [, block] of html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    const jobTitle =
      extractTag(block, "span", "job-result-card__title") ||
      extractTag(block, "span", "base-search-card__title") ||
      extractTag(block, "h3", "");
    const company =
      extractTag(block, "h4", "result-card__subtitle") ||
      extractTag(block, "h4", "base-search-card__subtitle");
    const loc =
      extractTag(block, "span", "job-result-card__location") ||
      extractTag(block, "span", "job-search-card__location");
    const rawLink = extractAttr(block, "a", "href");
    const link = rawLink?.match(
      /(https:\/\/www\.linkedin\.com\/jobs\/view\/[^?&"]+)/,
    )?.[1];
    const date = block.match(/<time[^>]*datetime="([^"]+)"/i)?.[1];

    const description = [company, loc].filter(Boolean).join(" · ") || null;

    if (jobTitle) {
      jobs.push({
        title: cleanText(jobTitle),
        company: cleanText(company),
        location: cleanText(loc) || location,
        url: link || buildSearchUrl("LinkedIn", title, location),
        postedAt: relativeDate(date),
        modality: detectModality((jobTitle || "") + " " + (loc || "")),
        salary: null,
        description,
        source: "LinkedIn",
        synthetic: !link,
      });
    }
  }

  return jobs.length > 0
    ? jobs
    : [
        syntheticJob(
          title,
          location,
          "LinkedIn",
          buildSearchUrl("LinkedIn", title, location),
        ),
      ];
}

function parseIndeedRSS(xml, title, location) {
  if (!xml)
    return [
      syntheticJob(
        title,
        location,
        "Indeed",
        buildSearchUrl("Indeed", title, location),
      ),
    ];
  const jobs = [];

  for (const [, block] of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const jobTitle = cleanText(stripCDATA(extractRawTag(block, "title")));
    const link = cleanText(stripCDATA(extractRawTag(block, "link")));
    const company = cleanText(stripCDATA(extractRawTag(block, "source")));
    const rawDesc = stripCDATA(extractRawTag(block, "description")) || "";
    const date = stripCDATA(extractRawTag(block, "pubDate"));
    const description = cleanDescription(rawDesc);

    if (jobTitle && link) {
      jobs.push({
        title: jobTitle,
        company,
        location,
        url: link,
        postedAt: relativeDate(date),
        modality: detectModality(jobTitle + " " + rawDesc),
        salary: extractSalary(rawDesc),
        description,
        source: "Indeed",
        synthetic: false,
      });
    }
  }

  return jobs.length > 0
    ? jobs
    : [
        syntheticJob(
          title,
          location,
          "Indeed",
          buildSearchUrl("Indeed", title, location),
        ),
      ];
}

function parseOCC(html, title, location) {
  if (!html)
    return [
      syntheticJob(
        title,
        location,
        "OCC Mundial",
        buildSearchUrl("OCC Mundial", title, location),
      ),
    ];
  const jobs = [];

  for (const [, block] of html.matchAll(
    /<article[^>]*>([\s\S]*?)<\/article>/gi,
  )) {
    const jobTitle = extractTag(block, "h2", "") || extractTag(block, "h3", "");
    const company =
      extractTag(block, "span", "company") || extractTag(block, "a", "company");
    const loc =
      extractTag(block, "span", "location") ||
      extractTag(block, "span", "city");
    const rawLink = extractAttr(block, "a", "href");
    const fullUrl = rawLink
      ? rawLink.startsWith("http")
        ? rawLink
        : `https://www.occ.com.mx${rawLink}`
      : buildSearchUrl("OCC Mundial", title, location);

    const rawDesc =
      extractTag(block, "p", "description") ||
      extractTag(block, "span", "description") ||
      extractTag(block, "p", "summary") ||
      null;
    const description = cleanDescription(rawDesc);

    if (jobTitle) {
      jobs.push({
        title: cleanText(jobTitle),
        company: cleanText(company),
        location: cleanText(loc) || location,
        url: fullUrl,
        postedAt: null,
        modality: detectModality(block),
        salary: extractSalary(block),
        description,
        source: "OCC Mundial",
        synthetic: !rawLink,
      });
    }
  }

  return jobs.length > 0
    ? jobs
    : [
        syntheticJob(
          title,
          location,
          "OCC Mundial",
          buildSearchUrl("OCC Mundial", title, location),
        ),
      ];
}

function parseComputrabajo(html, title, location) {
  if (!html)
    return [
      syntheticJob(
        title,
        location,
        "Computrabajo",
        buildSearchUrl("Computrabajo", title, location),
      ),
    ];
  const jobs = [];
  const dom = getDomains(location);

  for (const [, block] of html.matchAll(
    /<article[^>]*>([\s\S]*?)<\/article>/gi,
  )) {
    const jobTitle = extractTag(block, "h2", "") || extractTag(block, "h3", "");
    const company =
      extractTag(block, "span", "company-name") ||
      extractTag(block, "a", "company");
    const loc =
      extractTag(block, "span", "city") || extractTag(block, "p", "location");
    const rawLink = extractAttr(block, "a", "href");
    // Corrección crítica: Usar el dominio dinámico al extraer el enlace relativo
    const fullUrl = rawLink
      ? rawLink.startsWith("http")
        ? rawLink
        : `https://${dom.computrabajo}${rawLink}`
      : buildSearchUrl("Computrabajo", title, location);

    const rawDesc =
      extractTag(block, "p", "fs16") ||
      extractTag(block, "p", "description") ||
      extractTag(block, "div", "description") ||
      extractTag(block, "p", "") ||
      null;
    const description = cleanDescription(rawDesc);

    if (jobTitle) {
      jobs.push({
        title: cleanText(jobTitle),
        company: cleanText(company),
        location: cleanText(loc) || location,
        url: fullUrl,
        postedAt: null,
        modality: detectModality(block),
        salary: extractSalary(block),
        description,
        source: "Computrabajo",
        synthetic: !rawLink,
      });
    }
  }

  return jobs.length > 0
    ? jobs
    : [
        syntheticJob(
          title,
          location,
          "Computrabajo",
          buildSearchUrl("Computrabajo", title, location),
        ),
      ];
}

function parseGetOnBrd(json, title, location) {
  if (!json)
    return [
      syntheticJob(
        title,
        location,
        "GetOnBrd",
        buildSearchUrl("GetOnBrd", title, location),
      ),
    ];
  let data;
  try {
    data = JSON.parse(json);
  } catch {
    return [
      syntheticJob(
        title,
        location,
        "GetOnBrd",
        buildSearchUrl("GetOnBrd", title, location),
      ),
    ];
  }
  const items = Array.isArray(data) ? data : data.data || data.jobs || [];
  if (!items.length)
    return [
      syntheticJob(
        title,
        location,
        "GetOnBrd",
        buildSearchUrl("GetOnBrd", title, location),
      ),
    ];

  return items.slice(0, 3).map((job) => ({
    title: cleanText(job.title || job.name) || title,
    company: cleanText(job.company?.name || job.company) || null,
    location: job.remote_modality ? "Remoto" : job.locations?.[0] || location,
    url: job.url || `https://www.getonbrd.com/jobs/${job.id}`,
    postedAt: relativeDate(job.published_at),
    modality:
      job.remote_modality === "full_remote"
        ? "Remoto"
        : job.remote_modality === "hybrid"
          ? "Híbrido"
          : "Presencial",
    salary: job.min_salary
      ? `$${num(job.min_salary)} – $${num(job.max_salary)} MXN`
      : null,
    description: cleanDescription(
      job.description || job.short_description || job.functions,
    ),
    source: "GetOnBrd",
    synthetic: false,
  }));
}

// ── PORTALES ──────────────────────────────────────────────────
// Modificados para inyectar dinámicamente el dominio según la variable "l" (location)
const PORTALS = {
  linkedin: {
    name: "LinkedIn",
    buildUrl: (t, l) =>
      `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${enc(t)}&location=${enc(l)}&start=0&count=3&f_TPR=r604800`,
    parse: parseLinkedin,
  },
  indeed: {
    name: "Indeed",
    buildUrl: (t, l) =>
      `https://${getDomains(l).indeed}/rss?q=${enc(t)}&l=${enc(l)}&sort=date&limit=3`,
    parse: parseIndeedRSS,
  },
  occ: {
    name: "OCC Mundial",
    buildUrl: (t, l) =>
      `https://www.occ.com.mx/empleos/de-${slug(t)}/?sort=date${getDomains(l).isMexico ? "" : "&loc=" + enc(l)}`,
    parse: parseOCC,
  },
  computrabajo: {
    name: "Computrabajo",
    buildUrl: (t, l) =>
      `https://${getDomains(l).computrabajo}/empleos-de-${slug(t)}`,
    parse: parseComputrabajo,
  },
  getonbrd: {
    name: "GetOnBrd",
    buildUrl: (t, l) =>
      `https://www.getonbrd.com/jobs/programming.json?search=${enc(t)}&per_page=3`,
    parse: parseGetOnBrd,
  },
};

async function scrapePortal(portal, title, location, maxJobs) {
  try {
    const url = portal.buildUrl(title, location);
    const html = await fetchSafe(url);
    const jobs = portal.parse(html, title, location);
    return {
      portal: portal.name,
      searchUrl: buildSearchUrl(portal.name, title, location),
      jobs: jobs.slice(0, maxJobs),
    };
  } catch {
    return {
      portal: portal.name,
      searchUrl: buildSearchUrl(portal.name, title, location),
      jobs: [
        syntheticJob(
          title,
          location,
          portal.name,
          buildSearchUrl(portal.name, title, location),
        ),
      ],
    };
  }
}

// ── HANDLER ───────────────────────────────────────────────────
export async function getJobListings(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Método no permitido" });

  const {
    title,
    location = "México",
    portals = "linkedin,indeed,occ,computrabajo,getonbrd",
    limit = "2",
  } = req.query;

  if (!title?.trim())
    return res.status(400).json({ error: "Falta el parámetro 'title'" });

  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=1800");

  const keys = portals
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter((k) => PORTALS[k]);
  const maxJobs = Math.min(Math.max(parseInt(limit) || 2, 1), 3);

  const settled = await Promise.allSettled(
    keys.map((k) =>
      scrapePortal(PORTALS[k], title.trim(), location.trim(), maxJobs),
    ),
  );

  const results = settled
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter(Boolean)
    .filter((r) => r.jobs.length > 0);

  const allJobs = results.flatMap((r) => r.jobs);
  const salaries = allJobs.map((j) => j.salary).filter(Boolean);
  const modalities = [
    ...new Set(allJobs.map((j) => j.modality).filter(Boolean)),
  ];

  return res.status(200).json({
    title,
    location,
    totalVacancies: allJobs.filter((j) => !j.synthetic).length,
    salaryRange: salaries[0] || null,
    modalities,
    portals: results,
    searchedAt: new Date().toISOString(),
  });
}

export default getJobListings;
