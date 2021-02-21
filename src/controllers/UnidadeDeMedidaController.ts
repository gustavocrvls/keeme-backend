import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import UnidadeDeMedida from '../models/UnidadeDeMedida';

/**
 * @author Gustavo Carvalho Silva
 * @since 21/02/2020
 */
export default {
  async index(req: Request, res: Response): Promise<any> {
    const UnidadeDeMedidaRepository = getRepository(UnidadeDeMedida);

    const unidadesDeMedida = await UnidadeDeMedidaRepository.find({});

    return res.json({ unidadesDeMedida });
  },
};
