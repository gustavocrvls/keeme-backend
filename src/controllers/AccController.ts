
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Acc from '../models/Acc';
import accView from '../views/acc_view';
import * as Yup from 'yup';
import STATUS_DA_ACC from '../constants/StatusDaAcc';

/**
 * @author Gustavo Carvalho Silva
 * @since 19/11/2020
 * 
 */
export default {

  async index(req: Request, res: Response) {
    const accRepository = getRepository(Acc);

    const accs = await accRepository.find({
      relations: ['status_da_acc', 'tipo_de_acc', 'tipo_de_acc.unidade_de_medida', 'usuario', 'usuario.perfil', 'usuario.curso'],
    });

    return res.json(accView.renderManyWithUser(accs));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const accRepository = getRepository(Acc);

    const accs = await accRepository.findOneOrFail(id, {
      relations: ['status_da_acc', 'tipo_de_acc', 'tipo_de_acc.unidade_de_medida', 'usuario', 'usuario.perfil', 'usuario.curso'],
    });

    return res.json(accView.render(accs));
  },

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;

    const accRepository = getRepository(Acc);

    const accs = await accRepository
      .createQueryBuilder("acc")
      .leftJoinAndSelect("acc.status_da_acc", "status_da_acc")
      .leftJoinAndSelect("acc.tipo_de_acc", "tipo_de_acc")
      .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
      .leftJoinAndSelect("acc.usuario", "usuario")
      .leftJoinAndSelect("usuario.perfil", "perfil")
      .leftJoinAndSelect("usuario.curso", "curso")
      .where("usuario.id = :id", { id: id })
      .getMany();


    return res.json(accs);
  },

  async showByStatus(req: Request, res: Response) {
    const { id } = req.params;

    const accRepository = getRepository(Acc);

    const accs = await accRepository
      .createQueryBuilder("acc")
      .leftJoinAndSelect("acc.status_da_acc", "status_da_acc")
      .leftJoinAndSelect("acc.tipo_de_acc", "tipo_de_acc")
      .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
      .leftJoinAndSelect("acc.usuario", "usuario")
      .leftJoinAndSelect("usuario.perfil", "perfil")
      .leftJoinAndSelect("usuario.curso", "curso")
      .where("status_da_acc.id = :id", { id: id })
      .getMany();

    return res.json(accs);
  },

  async summary(req: Request, res: Response) {
    const { id } = req.params;

    interface PontuacaoPorTipo {
      tipo: number,
      limite: number,
      pontos: number
    }

    const contarPontos = (accs: PontuacaoPorTipo[]) => {
      let acumulador = 0;
      accs.map(acc => {
        acumulador += acc.pontos > acc.limite ? acc.limite : acc.pontos;
      })
      return acumulador;
    }

    const getPontuacaoByStatus = async (user_id: string, status: number) => {
      const accRepository = getRepository(Acc);

      const pontuacaoByStatus = await accRepository
        .createQueryBuilder("acc")
        .leftJoinAndSelect("acc.status_da_acc", "status_da_acc")
        .leftJoinAndSelect("acc.tipo_de_acc", "tipo_de_acc")
        .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
        .leftJoinAndSelect("acc.usuario", "usuario")
        .leftJoinAndSelect("usuario.perfil", "perfil")
        .leftJoinAndSelect("usuario.curso", "curso")
        .select("SUM(acc.quantidade * tipo_de_acc.pontos_por_unidade)", "pontos")
        .addSelect("status_da_acc.id", "status")
        .addSelect("tipo_de_acc.limite_de_pontos", "limite")
        .groupBy("tipo_de_acc.id")
        .where("usuario.id = :id AND status_da_acc.id = :id_status", { id: user_id, id_status: status })
        .getRawMany();
        
        return pontuacaoByStatus;
      }

      const pontuacaoStatusEmAnalise = await getPontuacaoByStatus(id, STATUS_DA_ACC.EM_ANALISE);
      const pontuacaoStatusAprovada = await getPontuacaoByStatus(id, STATUS_DA_ACC.APROVADA);
      const pontuacaoStatusNegada = await getPontuacaoByStatus(id, STATUS_DA_ACC.NEGADA);
      
      let pontosEmAnalise = contarPontos(pontuacaoStatusEmAnalise);
      let pontosAprovados = contarPontos(pontuacaoStatusAprovada);
      let pontosNegados = contarPontos(pontuacaoStatusNegada);


    return res.json({resumo : {pontosEmAnalise, pontosAprovados, pontosNegados}});
  },

  async complete(req: Request, res: Response) {
    const { id } = req.params;
    const accRepository = getRepository(Acc);

    interface PontuacaoPorTipo {
      tipo: number,
      limite: number,
      pontos: number
    }

    const contarPontos = (accs: PontuacaoPorTipo[]) => {
      let acumulador = 0;
      accs.map(acc => {
        acumulador += acc.pontos > acc.limite ? acc.limite : acc.pontos;
      })
      return acumulador;
    }

    const getPontuacaoByStatus = async (user_id: string, status: number) => {
      const accRepository = getRepository(Acc);

      const pontuacaoByStatus = await accRepository
        .createQueryBuilder("acc")
        .leftJoinAndSelect("acc.status_da_acc", "status_da_acc")
        .leftJoinAndSelect("acc.tipo_de_acc", "tipo_de_acc")
        .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
        .leftJoinAndSelect("acc.usuario", "usuario")
        .leftJoinAndSelect("usuario.perfil", "perfil")
        .leftJoinAndSelect("usuario.curso", "curso")
        .select("SUM(acc.quantidade * tipo_de_acc.pontos_por_unidade)", "pontos")
        .addSelect("status_da_acc.id", "status")
        .addSelect("tipo_de_acc.limite_de_pontos", "limite")
        .groupBy("tipo_de_acc.id")
        .where("usuario.id = :id AND status_da_acc.id = :id_status", { id: user_id, id_status: status })
        .getRawMany();
      
      return pontuacaoByStatus;
    }

    const pontuacaoStatusEmAnalise = await getPontuacaoByStatus(id, STATUS_DA_ACC.EM_ANALISE);
    const pontuacaoStatusAprovada = await getPontuacaoByStatus(id, STATUS_DA_ACC.APROVADA);
    const pontuacaoStatusNegada = await getPontuacaoByStatus(id, STATUS_DA_ACC.NEGADA);

    let pontosEmAnalise = contarPontos(pontuacaoStatusEmAnalise);
    let pontosAprovados = contarPontos(pontuacaoStatusAprovada);
    let pontosNegados = contarPontos(pontuacaoStatusNegada);

    const accs = await accRepository
      .createQueryBuilder("acc")
      .leftJoinAndSelect("acc.status_da_acc", "status_da_acc")
      .leftJoinAndSelect("acc.tipo_de_acc", "tipo_de_acc")
      .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
      .leftJoinAndSelect("acc.usuario", "usuario")
      .leftJoinAndSelect("usuario.perfil", "perfil")
      .leftJoinAndSelect("usuario.curso", "curso")
      .where("usuario.id = :id", { id: id })
      .getMany();

    return res.json({ resumo: { pontosEmAnalise, pontosAprovados, pontosNegados }, accs: accView.renderMany(accs) });
  },

  async create(req: Request, res: Response) {
    const {
      quantidade,
      sobre,
      idUsuario,
      tipoDeAcc,
      ativa,
      status_da_acc,
    } = req.body;

    const accRepository = getRepository(Acc);

    const data = {
      quantidade,
      sobre,
      usuario: idUsuario,
      tipo_de_acc: tipoDeAcc,
    };

    const schema = Yup.object().shape({
      quantidade: Yup.number().required(),
      sobre: Yup.string().optional().max(300),
      usuario: Yup.number().required(),
      tipo_de_acc: Yup.number().required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const acc = accRepository.create(data);

    await accRepository.save(acc);

    return res.status(201).json(acc);
  },

  async remover(req: Request, res: Response) {
    const { id } = req.params;

    const accRepository = getRepository(Acc);

    let accRemovida = await accRepository.findOne(id) || new Acc;
    await accRepository.remove(accRemovida);

    res.sendStatus(200);
  }
}