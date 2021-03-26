import Acc from '../models/Acc';
import statusDaAccView from './status_da_acc_view';
import usuarioView from './usuario_view';
import tipoDeAccView from './tipo_de_acc_view';

export default {
  render(acc: Acc): any {
    return {
      id: acc.id,
      quantidade: acc.quantidade,
      descricao: acc.descricao,
      status_da_acc: statusDaAccView.render(acc.status_da_acc),
      tipo_de_acc: tipoDeAccView.renderMinimal(acc.tipo_de_acc),
      id_certificado: acc.certificado.id,
    };
  },

  renderMinimal(acc: Acc): any {
    return {
      id: acc.id,
      quantidade: acc.quantidade,
      // descricao: acc.descricao,
      status_da_acc: statusDaAccView.render(acc.status_da_acc),
    };
  },

  renderWithUser(acc: Acc): any {
    return {
      id: acc.id,
      quantidade: acc.quantidade,
      descricao: acc.descricao,
      usuario: usuarioView.render(acc.usuario),
      status_da_acc: statusDaAccView.render(acc.status_da_acc),
      tipo_de_acc: tipoDeAccView.render(acc.tipo_de_acc),
      id_certificado: acc.certificado.id,
      criado_em: acc.criado_em,
      avaliacao_da_acc: {
        id: acc.avaliacao_da_acc?.id,
        descricao: acc.avaliacao_da_acc?.descricao,
        criado_em: acc.avaliacao_da_acc?.criado_em,
        usuario: {
          id: acc.avaliacao_da_acc?.usuario.id,
          nome: acc.avaliacao_da_acc?.usuario.nome,
        },
      },
      variante_de_acc: {
        id: acc.variante_de_acc.id,
        descricao: acc.variante_de_acc.descricao,
        pontos_por_unidade: acc.variante_de_acc.pontos_por_unidade,
        tipo_de_acc: acc.variante_de_acc.tipo_de_acc,
      },
    };
  },

  renderMany(accs: Acc[]): any {
    return accs.map(acc => this.render(acc));
  },

  renderManyMinimal(accs: Acc[]): any {
    return accs.map(acc => this.renderMinimal(acc));
  },

  renderManyWithUser(accs: Acc[]): any {
    return accs.map(acc => this.renderWithUser(acc));
  },
};
