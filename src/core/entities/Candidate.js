export class Candidate {
  constructor({ name, skills = [] }) {
    this.name = name || "Candidato";
    this.skills = skills;
  }

  // Genera una cadena optimizada para motores de búsqueda (ej: "React Kotlin Node.js")
  getSearchQuery() {
    return this.skills.map(s => encodeURIComponent(s)).join(' ');
  }

  // Obtiene la skill principal para búsquedas destacadas
  getPrimarySkill() {
    return this.skills.length > 0 ? this.skills[0] : '';
  }

  // Valida si el candidato tiene al menos una skill detectada
  hasSkills() {
    return this.skills.length > 0;
  }
}