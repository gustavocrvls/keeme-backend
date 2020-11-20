import Pontuacao from "../models/Pontuacao";
import statusDaPontuacaoView from "../views/status_da_pontuacao_view";
import usuarioView from "../views/usuario_view";
import tipoDeAccView from "./tipo_de_acc_view";

export default {
  render(pontuacao: Pontuacao) {
    return {
      id: pontuacao.id,
      ativa: pontuacao.ativa,
      quantidade: pontuacao.quantidade,
      sobre: pontuacao.sobre,
      usuario: usuarioView.render(pontuacao.usuario),
      status_da_pontuacao: statusDaPontuacaoView.render(pontuacao.status_da_pontuacao),
      tipo_de_acc: tipoDeAccView.render(pontuacao.tipo_de_acc),
    };
  },

  renderMany(pontuacao: Pontuacao[]) {
    return pontuacao.map(pontuacao => this.render(pontuacao))
  }
}
