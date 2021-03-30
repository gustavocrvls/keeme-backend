import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { ACC } from '../entities/ACC';
import { ACCAssessment } from '../entities/ACCAssessment';

/**
 * @author Gustavo Carvalho Silva
 * @since 28/11/2020
 * @description Controller responsável pelas manipulações das Avaliações das ACCs
 */
export default {
  async index(req: Request, res: Response): Promise<any> {
    const avaliacaoDaAccRepository = getRepository(ACCAssessment);

    const avaliacoesDaAcc = await avaliacaoDaAccRepository.find({
      relations: ['acc', 'user'],
    });

    return res.json(avaliacoesDaAcc);
  },

  async create(req: Request, res: Response): Promise<any> {
    const { description, acc, user, acc_status } = req.body;

    const avaliacaoDaAccRepository = getRepository(ACCAssessment);
    const accRepository = getRepository(ACC);

    const data = {
      description,
      acc,
      user,
    };

    const schema = Yup.object().shape({
      description: Yup.string(),
      acc: Yup.number(),
      user: Yup.number(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const avaliacaoDaAcc = await avaliacaoDaAccRepository.findOne({
      relations: ['acc', 'user'],
      where: {
        acc,
      },
    });

    if (avaliacaoDaAcc)
      return res.status(400).json({ msg: 'Já existe avaliação para essa ACC' });

    const updated = await accRepository.update(acc, { acc_status });

    const avaliacaoDaAccCreated = avaliacaoDaAccRepository.create(data);
    await avaliacaoDaAccRepository.save(avaliacaoDaAccCreated);

    return res.status(201).json({ updated });
  },
};
