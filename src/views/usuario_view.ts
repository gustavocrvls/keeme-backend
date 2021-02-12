import Usuario from '../models/Usuario';
import perfilView from './perfil_view';
import cursoView from './curso_view';

export default {
  render(usuario: Usuario): any {
    return {
      id: usuario.id,
      nome: usuario.nome,
      username: usuario.username,
      perfil: perfilView.render(usuario.perfil),
      curso: cursoView.render(usuario.curso),
    };
  },

  renderMany(usuarios: Usuario[]): any {
    return usuarios.map(usuario => this.render(usuario));
  },
};
