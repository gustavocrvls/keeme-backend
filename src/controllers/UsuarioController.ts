import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Usuario from '../models/Usuario';
import usuarioView from '../views/usuario_view';
import * as Yup from 'yup';

export default {
  async index(req: Request, res: Response) {
    const usuarioRepository = getRepository(Usuario);

    const usuarios = await usuarioRepository.find({
      relations: ['perfil', 'curso']
    });

    return res.json(usuarioView.renderMany(usuarios));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.findOneOrFail(id, {
      relations: ['perfil', 'curso']
    });

    return res.json(usuarioView.render(usuario));
  },

  async create(req: Request, res: Response) {
    const {
      nome,
      sexo,
      username,
      senha,
      perfil,
      curso,
    } = req.body;

    const usuarioRepository = getRepository(Usuario);
    
    const data = {
      nome,
      sexo,
      username,
      senha,
      curso,
      perfil,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      sexo: Yup.string().required(),
      username: Yup.string().required(),
      senha: Yup.string().required().max(300),
      curso: Yup.number().required(),
      perfil: Yup.number().required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const usuario = usuarioRepository.create(data);
  
    await usuarioRepository.save(usuario);
  
    return res.status(201).json(usuario);
  }
}