import Curso from '../models/Curso';

export default {
  render(curso: Curso): any {
    return {
      id: curso.id,
      nome: curso.nome,
    };
  },

  renderMany(cursos: Curso[]): any {
    return cursos.map(curso => this.render(curso));
  },
};
