// Esta es una "Interface" (en JS puro usamos una clase que lanza errores)
export class CVRepository {
  parse(file) {
    throw new Error("Método parse() no implementado");
  }
}