import Acc from "../models/Acc";
import statusDaAccView from "./status_da_acc_view";
import usuarioView from "./usuario_view";
import tipoDeAccView from "./tipo_de_acc_view";

interface Counter {
  pontosEmAnalise : number,
  pontosAprovados: number,
  pontosNegados: number
}

export default {
  render(acc: Acc) {
    return {
      id: acc.id,
      quantidade: acc.quantidade,
      sobre: acc.sobre,
      pontos: acc.quantidade * acc.tipo_de_acc.pontos_por_unidade,
      status_da_acc: statusDaAccView.render(acc.status_da_acc),
      tipo_de_acc: tipoDeAccView.renderMinimal(acc.tipo_de_acc),
      id_certificado: acc.certificado.id,
    };
  },

  renderMinimal(acc: Acc) {
    return {
      id: acc.id,
      quantidade: acc.quantidade,
      // sobre: acc.sobre,
      status_da_acc: statusDaAccView.render(acc.status_da_acc),
    };
  },
  
  renderDetails(acc: Acc) {
    return {
      id: acc.id,
      quantidade: acc.quantidade,
      sobre: acc.sobre,
      pontos: acc.quantidade * acc.tipo_de_acc.pontos_por_unidade,
      status_da_acc: statusDaAccView.render(acc.status_da_acc),
      tipo_de_acc: tipoDeAccView.render(acc.tipo_de_acc),
    };
  },

  renderWithUser(acc: Acc) {
    return {
      id: acc.id,
      quantidade: acc.quantidade,
      sobre: acc.sobre,
      usuario: usuarioView.render(acc.usuario),
      pontos: acc.quantidade * acc.tipo_de_acc.pontos_por_unidade,
      status_da_acc: statusDaAccView.render(acc.status_da_acc),
      tipo_de_acc: tipoDeAccView.render(acc.tipo_de_acc),
    };
  },

  renderCounters(counter: Counter) {
    return ''
  },

  renderMany(acc: Acc[]) {
    return acc.map(acc => this.render(acc))
  },
  
  renderManyMinimal(acc: Acc[]) {
    return acc.map(acc => this.renderMinimal(acc))
  },

  renderManyWithUser(acc: Acc[]) {
    return acc.map(acc => this.renderWithUser(acc))
  },
}
