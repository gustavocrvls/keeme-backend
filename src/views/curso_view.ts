import Curso from "../models/Curso";

export default {
  render(curso: Curso) {
    return {
      id: curso.id,
      nome: curso.nome,
    };
  },

  renderMany(curso: Curso[]) {
    return curso.map(curso => this.render(curso))
  }
}