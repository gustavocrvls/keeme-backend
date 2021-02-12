import UnidadeDeMedida from '../models/UnidadeDeMedida';

export default {
  render(unidadeDeMedida: UnidadeDeMedida): any {
    return {
      id: unidadeDeMedida.id,
      nome: unidadeDeMedida.nome,
    };
  },

  renderMany(unidadeDeMedidas: UnidadeDeMedida[]): any {
    return unidadeDeMedidas.map(unidadeDeMedida =>
      this.render(unidadeDeMedida),
    );
  },
};
