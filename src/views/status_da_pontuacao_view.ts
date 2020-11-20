import StatusDaPontuacao from "../models/StatusDaPontuacao";

export default {
  render(statusDaPontuacao: StatusDaPontuacao) {
    return {
      id: statusDaPontuacao.id,
      nome: statusDaPontuacao.nome,
    };
  },

  renderMany(statusDaPontuacao: StatusDaPontuacao[]) {
    return statusDaPontuacao.map(statusDaPontuacao => this.render(statusDaPontuacao))
  }
}
