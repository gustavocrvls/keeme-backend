import TipoDeAcc from "../models/TipoDeAcc";
import unidadeDeMedidaView from "./unidade_de_medida_view";

export default {
  render(tipoDeAcc: TipoDeAcc) {
    return {
      id: tipoDeAcc.id,
      nome: tipoDeAcc.nome,
      pontos_por_unidade: tipoDeAcc.pontos_por_unidade,
      limite_de_pontos: tipoDeAcc.limite_de_pontos,
      sobre: tipoDeAcc.sobre,
      unidade_de_medida: unidadeDeMedidaView.render(tipoDeAcc.unidade_de_medida),
    };
  },

  renderMany(tipoDeAcc: TipoDeAcc[]) {
    return tipoDeAcc.map(tipoDeAcc => this.render(tipoDeAcc))
  }
}
