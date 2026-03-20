import { Candidate } from '../entities/Candidate.js';

// ─────────────────────────────────────────────────────────────
// GeoIDs LinkedIn — todos los estados de MX + USA
// ─────────────────────────────────────────────────────────────
const LINKEDIN_GEO_IDS = {
  // ── México — nacional ─────────────────────────────────────
  "México":                  "103323778",
  "América Latina":          "102757874",

  // ── México — todos los estados ───────────────────────────
  "Aguascalientes":          "104576485",
  "Baja California":         "104576482",
  "Baja California Sur":     "104576481",
  "Campeche":                "104576480",
  "Chiapas":                 "104576479",
  "Chihuahua":               "104576484",
  "Ciudad de México":        "100994111",
  "Coahuila":                "104576478",
  "Colima":                  "104576477",
  "Durango":                 "104576476",
  "Guanajuato":              "104576475",
  "Guerrero":                "104576474",
  "Hidalgo":                 "104576473",
  "Jalisco":                 "104576472",
  "México State":            "104576471",
  "Michoacán":               "104576470",
  "Morelos":                 "104576469",
  "Nayarit":                 "104576468",
  "Nuevo León":              "104576467",
  "Oaxaca":                  "104576466",
  "Puebla":                  "106303824",
  "Querétaro":               "104376636",
  "Quintana Roo":            "104576464",
  "San Luis Potosí":         "106481698",
  "Sinaloa":                 "104576462",
  "Sonora":                  "104576461",
  "Tabasco":                 "104576460",
  "Tamaulipas":              "104576459",
  "Tlaxcala":                "104576458",
  "Veracruz":                "104576457",
  "Yucatán":                 "104576456",
  "Zacatecas":               "104576455",

  // ── México — ciudades principales ────────────────────────
  "Guadalajara":             "100553404",
  "Monterrey":               "100876494",
  "León":                    "105349779",
  "Tijuana":                 "104537963",
  "Mérida":                  "104576487",
  "Hermosillo":              "104576490",
  "Saltillo":                "104576492",
  "Cancún":                  "104576483",
  "Toluca":                  "104576497",

  // ── LATAM ─────────────────────────────────────────────────
  "Buenos Aires":            "100446943",
  "Bogotá":                  "100876405",
  "Santiago":                "104621695",
  "Lima":                    "102438932",
  "São Paulo":               "102571014",
  "Medellín":                "105544334",
  "Caracas":                 "100876360",
  "Montevideo":              "104111077",
  "Quito":                   "100876418",
  "Ciudad de Guatemala":     "100876395",
  "San José":                "100876375",
  "Panamá":                  "100876386",

  // ── USA — nacional ────────────────────────────────────────
  "United States":           "103644278",
  "Remote USA":              "103644278",

  // ── USA — todos los estados ───────────────────────────────
  "Alabama":                 "102432166",
  "Alaska":                  "102757874",
  "Arizona":                 "102757874",
  "Arkansas":                "102757874",
  "California":              "102095887",
  "Colorado":                "105763813",
  "Connecticut":             "105080838",
  "Delaware":                "102757874",
  "Florida":                 "101318387",
  "Georgia":                 "101318387",
  "Hawaii":                  "102757874",
  "Idaho":                   "102757874",
  "Illinois":                "103112676",
  "Indiana":                 "102757874",
  "Iowa":                    "102757874",
  "Kansas":                  "102757874",
  "Kentucky":                "102757874",
  "Louisiana":               "102757874",
  "Maine":                   "102757874",
  "Maryland":                "103977389",
  "Massachusetts":           "101002888",
  "Michigan":                "102757874",
  "Minnesota":               "102757874",
  "Mississippi":             "102757874",
  "Missouri":                "102757874",
  "Montana":                 "102757874",
  "Nebraska":                "102757874",
  "Nevada":                  "102757874",
  "New Hampshire":           "102757874",
  "New Jersey":              "102757874",
  "New Mexico":              "102757874",
  "New York":                "105080838",
  "North Carolina":          "102757874",
  "North Dakota":            "102757874",
  "Ohio":                    "102757874",
  "Oklahoma":                "102757874",
  "Oregon":                  "102757874",
  "Pennsylvania":            "102757874",
  "Rhode Island":            "102757874",
  "South Carolina":          "102757874",
  "South Dakota":            "102757874",
  "Tennessee":               "102757874",
  "Texas":                   "102748797",
  "Utah":                    "102757874",
  "Vermont":                 "102757874",
  "Virginia":                "102757874",
  "Washington":              "100877329",
  "West Virginia":           "102757874",
  "Wisconsin":               "102757874",
  "Wyoming":                 "102757874",

  // ── USA — ciudades principales ────────────────────────────
  "New York City":           "105080838",
  "San Francisco":           "102277331",
  "Los Angeles":             "102448103",
  "Chicago":                 "103112676",
  "Austin":                  "103743442",
  "Miami":                   "104116203",
  "Seattle":                 "100877329",
  "Boston":                  "101002888",
  "Denver":                  "105763813",
  "Atlanta":                 "101318387",
  "Dallas":                  "102748797",
  "Houston":                 "102748797",
  "Phoenix":                 "102757874",
  "San Diego":               "102448103",
  "Portland":                "102757874",
  "Nashville":               "102757874",
  "Washington DC":           "103977389",
  "Las Vegas":               "102757874",
  "Minneapolis":             "102757874",
  "San Jose":                "102277331",
};

// ── Indeed MX — ubicaciones con formato correcto ─────────────
const INDEED_LOCATION_IDS = {
  "Aguascalientes":   "Aguascalientes%2C+Ags.",
  "Ciudad de México": "Ciudad+de+M%C3%A9xico%2C+CDMX",
  "Guadalajara":      "Guadalajara%2C+Jal.",
  "Monterrey":        "Monterrey%2C+N.L.",
  "Querétaro":        "Quer%C3%A9taro%2C+Qro.",
  "Puebla":           "Puebla%2C+Pue.",
  "León":             "Le%C3%B3n%2C+Gto.",
  "Tijuana":          "Tijuana%2C+B.C.",
  "Mérida":           "M%C3%A9rida%2C+Yuc.",
  "Saltillo":         "Saltillo%2C+Coah.",
  "Hermosillo":       "Hermosillo%2C+Son.",
  "Chihuahua":        "Chihuahua%2C+Chih.",
  "Cancún":           "Canc%C3%BAn%2C+Q.Roo.",
  "Toluca":           "Toluca%2C+Edo.Mex.",
  "San Luis Potosí":  "San+Luis+Potos%C3%AD%2C+S.L.P.",
  "Jalisco":          "Jalisco",
  "Nuevo León":       "Nuevo+Le%C3%B3n",
  "Guanajuato":       "Guanajuato",
  "Veracruz":         "Veracruz",
  "México":           "M%C3%A9xico",
};

const USA_LOCATIONS = new Set([
  "United States","Remote USA",
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
  "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
  "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
  "Maine","Maryland","Massachusetts","Michigan","Minnesota",
  "Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas",
  "Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
  "New York City","San Francisco","Los Angeles","Chicago","Austin",
  "Miami","Seattle","Boston","Denver","Atlanta","Dallas","Houston",
  "Phoenix","San Diego","Portland","Nashville","Washington DC",
  "Las Vegas","Minneapolis","San Jose",
]);

const isUSA = (loc) => USA_LOCATIONS.has(loc);

export class AnalyzeResume {
  constructor(cvRepository) {
    this.cvRepository = cvRepository;
  }

  async execute(file, location = "México") {
    const rawData = await this.cvRepository.parse(file);

    const candidate = new Candidate({
      name:   rawData.name,
      skills: rawData.skills,
    });

    const encodedLocation = encodeURIComponent(location);
    const geoId           = LINKEDIN_GEO_IDS[location] || "";
    const indeedLoc       = INDEED_LOCATION_IDS[location] || encodedLocation;
    const slug            = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    const usa             = isUSA(location);
    const occLocation     = location.split(',')[0].trim();

    const matches = candidate.skills.map(skillObj => {
      const jobTitle = skillObj.title || skillObj.name;
      const query    = encodeURIComponent(jobTitle);
      const jobSlug  = slug(jobTitle);

      // LinkedIn con geoId exacto (mucho más preciso que texto libre)
      const linkedinBase = geoId
        ? `https://www.linkedin.com/jobs/search/?keywords=${query}&geoId=${geoId}&f_TPR=r604800&sortBy=DD`
        : `https://www.linkedin.com/jobs/search/?keywords=${query}&location=${encodedLocation}&f_TPR=r604800&sortBy=DD`;

      const linkedinRemote = geoId
        ? `https://www.linkedin.com/jobs/search/?keywords=${query}&geoId=${geoId}&f_WT=2&f_TPR=r604800&sortBy=DD`
        : `https://www.linkedin.com/jobs/search/?keywords=${query}&f_WT=2&f_TPR=r604800&sortBy=DD`;

      // Indeed con ubicación estricta
      const indeedBase = usa
        ? `https://www.indeed.com/jobs?q=${query}&l=${encodedLocation}&fromage=7&sort=date&sc=0kf:attr(DSQF7)`
        : `https://mx.indeed.com/jobs?q=${query}&l=${indeedLoc}&fromage=7&sort=date&sc=0kf:attr(DSQF7)`;

      return {
        jobTitle,
        tech:    skillObj.name,
        preview: skillObj.preview || "Contexto no disponible",
        links: {

          // ── MX / LATAM ─────────────────────────────────────
          linkedin:       linkedinBase,
          linkedinRemote,
          occ:            `https://www.occ.com.mx/empleos/de-${jobSlug}/?ubicacion=${encodeURIComponent(occLocation)}`,
          computrabajo:   `https://www.computrabajo.com.mx/empleos-de-${jobSlug}?q=${encodeURIComponent(occLocation)}`,
          indeed:         indeedBase,
          glassdoor:      `https://www.glassdoor.com.mx/Empleo/mexico-${jobSlug}-empleos-SRCH_IL.0,6_IN167_KO7,${7 + jobTitle.length}.htm`,
          bumeran:        `https://www.bumeran.com.mx/empleos-busqueda-${jobSlug}.html`,
          konzerta:       `https://www.konzerta.com/bolsa-de-trabajo/${jobSlug}`,
          getonbrd:       `https://www.getonbrd.com/jobs/programming?search=${query}`,
          googleJobs:     `https://www.google.com/search?q=${query}+empleos+"${encodedLocation}"&ibp=htl;jobs`,

          // ── USA ────────────────────────────────────────────
          linkedinUSA:    `https://www.linkedin.com/jobs/search/?keywords=${query}&geoId=103644278&f_TPR=r604800&sortBy=DD`,
          linkedinUSARemote: `https://www.linkedin.com/jobs/search/?keywords=${query}&geoId=103644278&f_WT=2&f_TPR=r604800&sortBy=DD`,
          indeedUSA:      `https://www.indeed.com/jobs?q=${query}&l=United+States&fromage=7&sort=date&sc=0kf:attr(DSQF7)`,
          glassdoorUSA:   `https://www.glassdoor.com/Job/${jobSlug}-jobs-SRCH_KO0,${jobTitle.length}.htm`,
          dice:           `https://www.dice.com/jobs?q=${query}&countryCode=US&radius=30&radiusUnit=mi&pageSize=20&filters.postedDate=ONE`,
          builtIn:        `https://builtin.com/jobs/remote?search=${query}`,
          lever:          `https://www.google.com/search?q=site:jobs.lever.co+${query}`,
          greenhouse:     `https://www.google.com/search?q=site:boards.greenhouse.io+${query}`,
          ziprecruiter:   `https://www.ziprecruiter.com/jobs-search?search=${query}&location=United+States`,
          simplyhired:    `https://www.simplyhired.com/search?q=${query}&l=United+States`,

          // ── REMOTE / GLOBAL ────────────────────────────────
          remoteok:         `https://remoteok.com/remote-${jobSlug}-jobs`,
          weWorkRemotely:   `https://weworkremotely.com/remote-jobs/search?term=${query}`,
          wellfound:        `https://wellfound.com/jobs?q=${query}`,
          turing:           `https://www.turing.com/jobs`,
          toptal:           `https://www.toptal.com/talent/apply`,

          // ── EMPRESAS MX ────────────────────────────────────
          softtek:          `https://www.google.com/search?q=site:softtek.com/en-us/careers+${query}`,
          wizeline:         `https://www.google.com/search?q=site:jobs.wizeline.com+${query}`,
        }
      };
    });

    return {
      candidateName: candidate.name,
      matches,
      location,
    };
  }
}