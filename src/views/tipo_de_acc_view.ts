import TipoDeAcc from '../models/TipoDeAcc';
import unidadeDeMedidaView from './unidade_de_medida_view';
import accView from './acc_view';

export default {
  render(tipoDeAcc: TipoDeAcc): any {
    return {
      id: tipoDeAcc.id,
      nome: tipoDeAcc.nome,
      pontos_por_unidade: tipoDeAcc.pontos_por_unidade,
      limite_de_pontos: tipoDeAcc.limite_de_pontos,
      descricao: tipoDeAcc.descricao,
      unidade_de_medida: unidadeDeMedidaView.render(
        tipoDeAcc.unidade_de_medida,
      ),
    };
  },

  renderWithAccs(tipoDeAcc: TipoDeAcc): any {
    return {
      id: tipoDeAcc.id,
      nome: tipoDeAcc.nome,
      pontos_por_unidade: tipoDeAcc.pontos_por_unidade,
      limite_de_pontos: tipoDeAcc.limite_de_pontos,
      descricao: tipoDeAcc.descricao,
      unidade_de_medida: unidadeDeMedidaView.render(
        tipoDeAcc.unidade_de_medida,
      ),
      accs: accView.renderManyMinimal(tipoDeAcc.accs),
    };
  },

  renderMinimal(tipoDeAcc: TipoDeAcc): any {
    return {
      id: tipoDeAcc.id,
      nome: tipoDeAcc.nome,
      unidade_de_medida: unidadeDeMedidaView.render(
        tipoDeAcc.unidade_de_medida,
      ),
    };
  },

  renderMany(tipoDeAccs: TipoDeAcc[]): any {
    return tipoDeAccs.map(tipoDeAcc => this.render(tipoDeAcc));
  },

  renderManyWithAccs(tipoDeAccs: TipoDeAcc[]): any {
    return tipoDeAccs.map(tipoDeAcc => this.renderWithAccs(tipoDeAcc));
  },
};
