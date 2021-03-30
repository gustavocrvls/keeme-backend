import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { ACCType } from '../entities/ACCType';

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
      const tipoDeAccRepository = getRepository(ACCType);

      const tiposDeAcc = await tipoDeAccRepository.find({
        relations: ['unidade_de_medida', 'acc_variants'],
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
   * @deprecated
   */
  async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const tipoDeAccRepository = getRepository(ACCType);

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
   *  point_limit: number,
   *  description: string,
   *  unity_of_measurement: number,
   *  curso: number
   *
   * @deprecated
   */
  async create(req: Request, res: Response): Promise<any> {
    const {
      name,
      point_limit,
      description,
      unity_of_measurement,
      acc_variants,
    } = req.body;

    const tipoDeAccRepository = getRepository(ACCType);

    const data = {
      name,
      limite_de_pontos: point_limit,
      description,
      unidade_de_medida: unity_of_measurement,
      acc_variants,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      limite_de_pontos: Yup.number().required(),
      description: Yup.string().optional().max(300),
      unidade_de_medida: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const tipoDeAcc = tipoDeAccRepository.create(data);

    await tipoDeAccRepository.save(tipoDeAcc);

    return res.status(201).json(tipoDeAcc);
  },

  /**
   *
   * @deprecated
   */
  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const tipoDeAccRepository = getRepository(ACCType);

    const tipoDeACC = await tipoDeAccRepository.delete({ id: Number(id) });

    res.send({ tipoDeACC });
  },

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const tipoDeACCRepository = getRepository(ACCType);

    const tipoDeACC = await tipoDeACCRepository
      .createQueryBuilder('tipo-de-acc')
      .update(ACCType)
      .set(req.body)
      .where({ id: Number(id) })
      .execute();

    res.json({ tipoDeACC });
  },

  async massCreate(req: Request, res: Response): Promise<any> {
    const { tiposDeAcc } = req.body;

    const tipoDeAccRepository = getRepository(ACCType);

    tiposDeAcc.map(async (tipoDeAcc: ACCType) => {
      const data = {
        name: tipoDeAcc.name,
        point_limit: tipoDeAcc.point_limit,
        description: tipoDeAcc.description,
        acc_variants: tipoDeAcc.acc_variants,
        unity_of_measurement: tipoDeAcc.unity_of_measurement,
      };

      const newTipoDeAcc = tipoDeAccRepository.create(data);

      console.log(newTipoDeAcc);

      await tipoDeAccRepository.save(newTipoDeAcc);
    });

    return res.status(201).json(tiposDeAcc);
  },
};
