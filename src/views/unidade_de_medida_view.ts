import UnidadeDeMedida from "../models/UnidadeDeMedida";

export default {
  render(unidadeDeMedida: UnidadeDeMedida) {
    return {
      id: unidadeDeMedida.id,
      nome: unidadeDeMedida.nome,
    };
  },

  renderMany(unidadeDeMedida: UnidadeDeMedida[]) {
    return unidadeDeMedida.map(unidadeDeMedida => this.render(unidadeDeMedida))
  }
}
