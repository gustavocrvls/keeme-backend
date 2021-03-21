import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import TipoDeAcc from '../models/TipoDeAcc';
import tipoDeAccView from '../views/tipo_de_acc_view';
import StatusDaAccConsts from '../constants/StatusDaAcc';

/**
 * @author Gustavo Carvalho Silva
 * @since 19/11/2020
 *
 */
export default {
  /**
   * @author Gustavo Carvalho Silva
   * @since 19/11/2020
   *
   * @description retorna um objeto contendo todos os Tipos de ACC presentes no banco de dados
   * @deprecated
   */
  async index(req: Request, res: Response): Promise<any> {
    try {
      const tipoDeAccRepository = getRepository(TipoDeAcc);

      const tiposDeAcc = await tipoDeAccRepository.find({
        relations: ['unidade_de_medida', 'variantes_de_acc'],
      });

      return res.json(tiposDeAcc);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  /**
   * @author Gustavo Carvalho Silva
   * @since 21/02/2021
   *
   * @description retorna um Tipo de ACC pelo id recebido na requisição
   */
  async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const tipoDeAccRepository = getRepository(TipoDeAcc);

    const tipoDeACC = await tipoDeAccRepository.findOne({
      relations: ['unidade_de_medida'],
      where: {
        id,
      },
    });

    return res.json({ tipoDeACC });
  },

  /**
   * @author Gustavo Carvalho Silva
   * @since 14/11/2020
   *
   * @description cria um novo Tipo de ACC com os parametros recebidos no corpo da requisição
   *
   * corpo da requisição (req):
   *  nome: string,
   *  pontosPorUnidade: number,
   *  limiteDePontos: number,
   *  descricao: string,
   *  unidadeDeMedida: number,
   *  curso: number
   */
  async create(req: Request, res: Response): Promise<any> {
    const {
      nome,
      limiteDePontos,
      descricao,
      unidadeDeMedida,
      variantes_de_acc,
    } = req.body;

    const tipoDeAccRepository = getRepository(TipoDeAcc);

    const data = {
      nome,
      limite_de_pontos: limiteDePontos,
      descricao,
      unidade_de_medida: unidadeDeMedida,
      variantes_de_acc,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      limite_de_pontos: Yup.number().required(),
      descricao: Yup.string().optional().max(300),
      unidade_de_medida: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const tipoDeAcc = tipoDeAccRepository.create(data);
    console.log(tipoDeAcc);

    await tipoDeAccRepository.save(tipoDeAcc);

    return res.status(201).json(tipoDeAcc);
  },

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const tipoDeAccRepository = getRepository(TipoDeAcc);

    const tipoDeACC = await tipoDeAccRepository.delete({ id: Number(id) });

    res.send({ tipoDeACC });
  },

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const tipoDeACCRepository = getRepository(TipoDeAcc);

    const tipoDeACC = await tipoDeACCRepository
      .createQueryBuilder('tipo-de-acc')
      .update(TipoDeAcc)
      .set(req.body)
      .where({ id: Number(id) })
      .execute();

    res.json({ tipoDeACC });
  },

  async massCreate(req: Request, res: Response): Promise<any> {
    const { tiposDeAcc } = req.body;

    const tipoDeAccRepository = getRepository(TipoDeAcc);

    tiposDeAcc.map(async (tipoDeAcc: TipoDeAcc) => {
      const data = {
        nome: tipoDeAcc.nome,
        limite_de_pontos: tipoDeAcc.limite_de_pontos,
        descricao: tipoDeAcc.descricao,
        unidade_de_medida: tipoDeAcc.unidade_de_medida,
        variantes_de_acc: tipoDeAcc.variantes_de_acc,
      };

      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        limite_de_pontos: Yup.number().required(),
        descricao: Yup.string().optional().max(300),
        unidade_de_medida: Yup.number().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const newTipoDeAcc = tipoDeAccRepository.create(data);

      await tipoDeAccRepository.save(newTipoDeAcc);
    });

    return res.status(201).json(tiposDeAcc);
  },

  async getTiposDeAccByIdUsuario(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const tipoDeAccRepository = getRepository(TipoDeAcc);

    const tiposDeAcc = await tipoDeAccRepository
      .createQueryBuilder('tipo_de_acc')
      .leftJoinAndSelect('tipo_de_acc.unidade_de_medida', 'unidade_de_medida')
      .leftJoinAndSelect('tipo_de_acc.accs', 'acc')
      .leftJoinAndSelect('acc.usuario', 'usuario', 'usuario.id = :id_usuario', {
        id_usuario: id,
      })
      .leftJoinAndSelect('acc.status_da_acc', 'status_da_acc')
      .select([
        'tipo_de_acc',
        'status_da_acc',
        'unidade_de_medida',
        'acc',
        'usuario',
      ])
      .getMany();

    tiposDeAcc.map((tipoDeAcc, index) => {
      let acumulador = 0;
      tipoDeAcc.accs.map(acc => {
        if (acc.status_da_acc.id === StatusDaAccConsts.APROVADA)
          acumulador += acc.quantidade * tipoDeAcc.pontos_por_unidade;
        return acumulador;
      });
      tiposDeAcc[index].pontuacao = acumulador;
      return tiposDeAcc[index].pontuacao;
    });

    res.json(tiposDeAcc);
  },
};
