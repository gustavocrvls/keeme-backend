import StatusDaAcc from "../models/StatusDaAcc";

export default {
  render(statusDaAcc: StatusDaAcc) {
    return {
      id: statusDaAcc.id,
      nome: statusDaAcc.nome,
    };
  },

  renderMany(statusDaAcc: StatusDaAcc[]) {
    return statusDaAcc.map(statusDaAcc => this.render(statusDaAcc))
  }
}
