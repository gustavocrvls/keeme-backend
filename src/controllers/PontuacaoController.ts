
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Pontuacao from '../models/Pontuacao';
import pontuacaoView from '../views/pontuacao_view';
import * as Yup from 'yup';
import pontuacao_view from '../views/pontuacao_view';
import STATUS_DA_PONTUACAO from '../constants/StatusDaPontuacao';

/**
 * @author Gustavo Carvalho Silva
 * @since 19/11/2020
 * 
 */
export default {

  async index(req: Request, res: Response) {
    const pontuacaoRepository = getRepository(Pontuacao);

    const pontuacoes = await pontuacaoRepository.find({
      relations: ['status_da_pontuacao', 'tipo_de_acc', 'tipo_de_acc.unidade_de_medida', 'usuario', 'usuario.perfil', 'usuario.curso'],
    });

    return res.json(pontuacaoView.renderManyWithUser(pontuacoes));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const pontuacaoRepository = getRepository(Pontuacao);

    const pontuacoes = await pontuacaoRepository.findOneOrFail(id, {
      relations: ['status_da_pontuacao', 'tipo_de_acc', 'tipo_de_acc.unidade_de_medida', 'usuario', 'usuario.perfil', 'usuario.curso'],
    });

    return res.json(pontuacaoView.render(pontuacoes));
  },

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;

    const pontuacaoRepository = getRepository(Pontuacao);

    const pontuacoes = await pontuacaoRepository
      .createQueryBuilder("pontuacao")
      .leftJoinAndSelect("pontuacao.status_da_pontuacao", "status_da_pontuacao")
      .leftJoinAndSelect("pontuacao.tipo_de_acc", "tipo_de_acc")
      .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
      .leftJoinAndSelect("pontuacao.usuario", "usuario")
      .leftJoinAndSelect("usuario.perfil", "perfil")
      .leftJoinAndSelect("usuario.curso", "curso")
      .where("usuario.id = :id", { id: id })
      .getMany();


    return res.json(pontuacoes);
  },

  async summary(req: Request, res: Response) {
    const { id } = req.params;

    interface PontuacaoPorTipo {
      tipo: number,
      limite: number,
      pontos: number
    }

    const contarPontos = (pontuacoes: PontuacaoPorTipo[]) => {
      let acumulador = 0;
      pontuacoes.map(pontuacao => {
        acumulador += pontuacao.pontos > pontuacao.limite ? pontuacao.limite : pontuacao.pontos;
      })
      return acumulador;
    }

    const getPontuacaoByStatus = async (user_id: string, status: number) => {
      const pontuacaoRepository = getRepository(Pontuacao);

      const pontuacaoByStatus = await pontuacaoRepository
        .createQueryBuilder("pontuacao")
        .leftJoinAndSelect("pontuacao.status_da_pontuacao", "status_da_pontuacao")
        .leftJoinAndSelect("pontuacao.tipo_de_acc", "tipo_de_acc")
        .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
        .leftJoinAndSelect("pontuacao.usuario", "usuario")
        .leftJoinAndSelect("usuario.perfil", "perfil")
        .leftJoinAndSelect("usuario.curso", "curso")
        .select("SUM(pontuacao.quantidade * tipo_de_acc.pontos_por_unidade)", "pontos")
        .addSelect("status_da_pontuacao.id", "status")
        .addSelect("tipo_de_acc.limite_de_pontos", "limite")
        .groupBy("tipo_de_acc.id")
        .where("usuario.id = :id AND status_da_pontuacao.id = :id_status", { id: user_id, id_status: status })
        .getRawMany();
        
        return pontuacaoByStatus;
      }

      const pontuacaoStatusEmAnalise = await getPontuacaoByStatus(id, STATUS_DA_PONTUACAO.EM_ANALISE);
      const pontuacaoStatusAprovada = await getPontuacaoByStatus(id, STATUS_DA_PONTUACAO.APROVADA);
      const pontuacaoStatusNegada = await getPontuacaoByStatus(id, STATUS_DA_PONTUACAO.NEGADA);
      
      let pontosEmAnalise = contarPontos(pontuacaoStatusEmAnalise);
      let pontosAprovados = contarPontos(pontuacaoStatusAprovada);
      let pontosNegados = contarPontos(pontuacaoStatusNegada);


    return res.json({resumo : {pontosEmAnalise, pontosAprovados, pontosNegados}});
  },

  async complete(req: Request, res: Response) {
    const { id } = req.params;
    const pontuacaoRepository = getRepository(Pontuacao);

    interface PontuacaoPorTipo {
      tipo: number,
      limite: number,
      pontos: number
    }

    const contarPontos = (pontuacoes: PontuacaoPorTipo[]) => {
      let acumulador = 0;
      pontuacoes.map(pontuacao => {
        acumulador += pontuacao.pontos > pontuacao.limite ? pontuacao.limite : pontuacao.pontos;
      })
      return acumulador;
    }

    const getPontuacaoByStatus = async (user_id: string, status: number) => {
      const pontuacaoRepository = getRepository(Pontuacao);

      const pontuacaoByStatus = await pontuacaoRepository
        .createQueryBuilder("pontuacao")
        .leftJoinAndSelect("pontuacao.status_da_pontuacao", "status_da_pontuacao")
        .leftJoinAndSelect("pontuacao.tipo_de_acc", "tipo_de_acc")
        .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
        .leftJoinAndSelect("pontuacao.usuario", "usuario")
        .leftJoinAndSelect("usuario.perfil", "perfil")
        .leftJoinAndSelect("usuario.curso", "curso")
        .select("SUM(pontuacao.quantidade * tipo_de_acc.pontos_por_unidade)", "pontos")
        .addSelect("status_da_pontuacao.id", "status")
        .addSelect("tipo_de_acc.limite_de_pontos", "limite")
        .groupBy("tipo_de_acc.id")
        .where("usuario.id = :id AND status_da_pontuacao.id = :id_status", { id: user_id, id_status: status })
        .getRawMany();
      
      return pontuacaoByStatus;
    }

    const pontuacaoStatusEmAnalise = await getPontuacaoByStatus(id, STATUS_DA_PONTUACAO.EM_ANALISE);
    const pontuacaoStatusAprovada = await getPontuacaoByStatus(id, STATUS_DA_PONTUACAO.APROVADA);
    const pontuacaoStatusNegada = await getPontuacaoByStatus(id, STATUS_DA_PONTUACAO.NEGADA);

    let pontosEmAnalise = contarPontos(pontuacaoStatusEmAnalise);
    let pontosAprovados = contarPontos(pontuacaoStatusAprovada);
    let pontosNegados = contarPontos(pontuacaoStatusNegada);

    const pontuacoes = await pontuacaoRepository
      .createQueryBuilder("pontuacao")
      .leftJoinAndSelect("pontuacao.status_da_pontuacao", "status_da_pontuacao")
      .leftJoinAndSelect("pontuacao.tipo_de_acc", "tipo_de_acc")
      .leftJoinAndSelect("tipo_de_acc.unidade_de_medida", "unidade_de_medida")
      .leftJoinAndSelect("pontuacao.usuario", "usuario")
      .leftJoinAndSelect("usuario.perfil", "perfil")
      .leftJoinAndSelect("usuario.curso", "curso")
      .where("usuario.id = :id", { id: id })
      .getMany();

    return res.json({ resumo: { pontosEmAnalise, pontosAprovados, pontosNegados }, pontuacoes: pontuacao_view.renderMany(pontuacoes) });
  },

  async create(req: Request, res: Response) {
    const {
      quantidade,
      sobre,
      idUsuario,
      tipoDeAcc,
      ativa,
      status_da_pontuacao,
    } = req.body;

    const pontuacaoRepository = getRepository(Pontuacao);

    const data = {
      ativa,
      status_da_pontuacao,
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

    const pontuacao = pontuacaoRepository.create(data);

    await pontuacaoRepository.save(pontuacao);

    return res.status(201).json(pontuacao);
  },

  async remover(req: Request, res: Response) {
    const { id } = req.params;

    const pontuacaoRepository = getRepository(Pontuacao);

    let pontuacaoRemovida = await pontuacaoRepository.findOne(id) || new Pontuacao;
    await pontuacaoRepository.remove(pontuacaoRemovida);

    res.sendStatus(200);
  }
}