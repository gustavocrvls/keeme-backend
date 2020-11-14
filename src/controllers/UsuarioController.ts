import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Usuario from '../models/Usuario';
import usuarioView from '../views/usuario_view';
import * as Yup from 'yup';

export default {
  async index(req: Request, res: Response) {
    const usuarioRepository = getRepository(Usuario);

    const orphanages = await usuarioRepository.find({
      relations: ['perfil', 'curso']
    });

    return res.json(usuarioView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    console.log(req.body);
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

    console.log(data);
    

    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   latitude: Yup.number().required(),
    //   longitude: Yup.number().required(),
    //   about: Yup.string().required().max(300),
    //   instructions: Yup.string().required(),
    //   opening_hours: Yup.string().required(),
    //   open_on_weekends: Yup.boolean().required(),
    //   images: Yup.array(
    //     Yup.object().shape({
    //       path: Yup.string().required()
    //     })
    //   ), 
    // })

    // await schema.validate(data, {
    //   abortEarly: false,
    // })

    const usuario = usuarioRepository.create(data);
  
    await usuarioRepository.save(usuario);
  
    return res.status(201).json(usuario);
  }
}