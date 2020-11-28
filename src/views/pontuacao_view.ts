import Pontuacao from "../models/Pontuacao";
import statusDaPontuacaoView from "../views/status_da_pontuacao_view";
import usuarioView from "../views/usuario_view";
import tipoDeAccView from "./tipo_de_acc_view";

interface Counter {
  pontosEmAnalise : number,
  pontosAprovados: number,
  pontosNegados: number
}

export default {
  render(pontuacao: Pontuacao) {
    return {
      id: pontuacao.id,
      ativa: pontuacao.ativa,
      quantidade: pontuacao.quantidade,
      sobre: pontuacao.sobre,
      pontos: pontuacao.quantidade * pontuacao.tipo_de_acc.pontos_por_unidade,
      status_da_pontuacao: statusDaPontuacaoView.render(pontuacao.status_da_pontuacao),
      tipo_de_acc: tipoDeAccView.render(pontuacao.tipo_de_acc),
    };
  },

  renderWithUser(pontuacao: Pontuacao) {
    return {
      id: pontuacao.id,
      ativa: pontuacao.ativa,
      quantidade: pontuacao.quantidade,
      sobre: pontuacao.sobre,
      usuario: usuarioView.render(pontuacao.usuario),
      pontos: pontuacao.quantidade * pontuacao.tipo_de_acc.pontos_por_unidade,
      status_da_pontuacao: statusDaPontuacaoView.render(pontuacao.status_da_pontuacao),
      tipo_de_acc: tipoDeAccView.render(pontuacao.tipo_de_acc),
    };
  },

  renderCounters(counter: Counter) {
    return ''
  },

  renderMany(pontuacao: Pontuacao[]) {
    return pontuacao.map(pontuacao => this.render(pontuacao))
  },

  renderManyWithUser(pontuacao: Pontuacao[]) {
    return pontuacao.map(pontuacao => this.renderWithUser(pontuacao))
  },
}
