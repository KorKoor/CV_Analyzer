import { Candidate } from '../entities/Candidate.js';

export class AnalyzeResume {
  constructor(cvRepository) {
    this.cvRepository = cvRepository;
  }

  async execute(file, location = "México") {
    // 1. Extraer datos del Repo
    const rawData = await this.cvRepository.parse(file);

    // 2. Crear Entidad de Dominio
    const candidate = new Candidate({
      name: rawData.name,
      skills: rawData.skills
    });

    const encodedLocation = encodeURIComponent(location);

    // 3. Transformar skills en Matches con links a múltiples portales
    const matches = candidate.skills.map(skillObj => {
      const jobTitle = skillObj.title || skillObj.name;
      const query    = encodeURIComponent(jobTitle);

      return {
        jobTitle: jobTitle,
        tech:     skillObj.name,
        preview:  skillObj.preview || "Contexto no disponible",
        links: {

          // ── LATAM GENERALISTAS ────────────────────────────────────────

          linkedin: `https://www.linkedin.com/jobs/search/?keywords=${query}&location=${encodedLocation}&f_TPR=r604800&sortBy=DD`,

          // OCC Mundial (MX) — búsqueda directa
          occ: `https://www.occ.com.mx/empleos/de-${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}/`,

          // Computrabajo (MX + LATAM) — soporta query + país
          computrabajo: `https://www.computrabajo.com.mx/empleos-de-${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}`,

          // Indeed MX
          indeed: `https://mx.indeed.com/jobs?q=${query}&l=${encodedLocation}&fromage=7&sort=date`,

          // Glassdoor MX
          glassdoor: `https://www.glassdoor.com.mx/Empleo/${encodedLocation}-${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}-empleos-SRCH_IL.0,${encodedLocation.length}_IC1121263_KO${encodedLocation.length + 1},${encodedLocation.length + 1 + jobTitle.length}.htm`,

          // Bumeran (Argentina / Perú / Chile / Venezuela)
          bumeran: `https://www.bumeran.com.mx/empleos-busqueda-${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}.html`,

          // Konzerta (MX)
          konzerta: `https://www.konzerta.com/bolsa-de-trabajo/${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}`,

          // OCCMundial vía Google como fallback enriquecido
          occGoogle: `https://www.google.com/search?q=site:occ.com.mx+${query}+${encodedLocation}`,

          // ── GLOBALES / TECH-FIRST ─────────────────────────────────────

          // We Work Remotely (remote tech jobs en inglés)
          weWorkRemotely: `https://weworkremotely.com/remote-jobs/search?term=${query}`,

          // Wellfound / AngelList (startups)
          wellfound: `https://wellfound.com/jobs?q=${query}&l=${encodedLocation}`,

          // RemoteOK (remote)
          remoteok: `https://remoteok.com/remote-${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}-jobs`,

          // HiredLatam (tech talent latinoamérica)
          hiredLatam: `https://www.google.com/search?q=site:hired.com+${query}+latam`,

          // Turing (trabajo remoto para devs LATAM)
          turing: `https://www.turing.com/jobs#${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}`,

          // Toptal (freelance / contratos)
          toptal: `https://www.toptal.com/developers#contract-${encodeURIComponent(jobTitle.toLowerCase().replace(/\s+/g, '-'))}`,

          // GetOnBrd (MX / LATAM startups tech)
          getonbrd: `https://www.getonbrd.com/jobs/programming?search=${query}`,

          // ── EMPRESAS CONCRETAS (búsqueda directa) ───────────────────

          // Softtek
          softtek: `https://www.google.com/search?q=site:softtek.com/en-us/careers+${query}+${encodedLocation}`,

          // Wizeline
          wizeline: `https://www.google.com/search?q=site:jobs.wizeline.com+${query}`,

          // Clip / Konfío / Kueski y otras fintechs MX vía Google Jobs
          googleJobs: `https://www.google.com/search?q=${query}+${encodedLocation}+empleos&ibp=htl;jobs`,
        }
      };
    });

    return {
      candidateName: candidate.name,
      matches:       matches,
      location:      location
    };
  }
}