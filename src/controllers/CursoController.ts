import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Curso from '../models/Curso';

/**
 * @author Gustavo Carvalho Silva
 * @since 28/11/2020
 * @description Controller responsável pelas manipulações de Curso
 */
export default {
  async create(req: Request, res: Response): Promise<any> {
    const { nome } = req.body;

    const cursoRepository = getRepository(Curso);

    const data = {
      nome,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().optional(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const curso = cursoRepository.create(data);

    await cursoRepository.save(curso);

    return res.status(201).json(curso);
  },
};
