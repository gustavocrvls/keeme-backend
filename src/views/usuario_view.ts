import Usuario from "../models/Usuario";
import perfilView from "../views/perfil_view";
import cursoView from "../views/curso_view";
// import pontuacaoView from 

export default {
  render(usuario: Usuario) {
    return {
      id: usuario.id,
      nome: usuario.nome,
      sexo: usuario.sexo,
      username: usuario.username,
      perfil: perfilView.render(usuario.perfil),
      curso: cursoView.render(usuario.curso),
    };
  },

  renderMany(usuarios: Usuario[]) {
    return usuarios.map(usuario => this.render(usuario))
  }
}
