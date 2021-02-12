import StatusDaAcc from '../models/StatusDaAcc';

export default {
  render(statusDaAcc: StatusDaAcc): any {
    return {
      id: statusDaAcc.id,
      nome: statusDaAcc.nome,
    };
  },

  renderMany(statusDaAccs: StatusDaAcc[]): any {
    return statusDaAccs.map(statusDaAcc => this.render(statusDaAcc));
  },
};
