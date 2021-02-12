import Perfil from '../models/Perfil';

export default {
  render(perfil: Perfil): any {
    return {
      id: perfil.id,
      nome: perfil.nome,
    };
  },

  renderMany(perfis: Perfil[]): any {
    return perfis.map(perfil => this.render(perfil));
  },
};
