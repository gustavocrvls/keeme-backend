import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Acc from '../models/Acc';
import AvaliacaoDaAcc from '../models/AvaliacaoDaAcc';

/**
 * @author Gustavo Carvalho Silva
 * @since 28/11/2020
 * @description Controller responsável pelas manipulações das Avaliações das ACCs
 */
export default {
  async index(req: Request, res: Response): Promise<any> {
    const avaliacaoDaAccRepository = getRepository(AvaliacaoDaAcc);

    const avaliacoesDaAcc = await avaliacaoDaAccRepository.find({
      relations: ['acc', 'usuario'],
    });

    return res.json(avaliacoesDaAcc);
  },

  async create(req: Request, res: Response): Promise<any> {
    const { descricao, acc, usuario, status_da_acc } = req.body;

    const avaliacaoDaAccRepository = getRepository(AvaliacaoDaAcc);
    const accRepository = getRepository(Acc);

    const data = {
      descricao,
      acc,
      usuario,
    };

    const schema = Yup.object().shape({
      descricao: Yup.string(),
      acc: Yup.number(),
      usuario: Yup.number(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const avaliacaoDaAcc = await avaliacaoDaAccRepository.findOne({
      relations: ['acc', 'usuario'],
      where: {
        acc,
      },
    });

    if (avaliacaoDaAcc)
      return res.status(400).json({ msg: 'Já existe avaliação para essa ACC' });

    const updated = await accRepository.update(acc, { status_da_acc });

    const avaliacaoDaAccCreated = avaliacaoDaAccRepository.create(data);
    await avaliacaoDaAccRepository.save(avaliacaoDaAccCreated);

    return res.status(201).json({ updated });
  },
};