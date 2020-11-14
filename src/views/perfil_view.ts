import Perfil from "../models/Perfil";

export default {
  render(perfil: Perfil) {
    return {
      id: perfil.id,
      nome: perfil.nome,
    };
  },

  renderMany(perfil: Perfil[]) {
    return perfil.map(perfil => this.render(perfil))
  }
}
