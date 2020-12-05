import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Usuario from '../models/Usuario';
import usuarioView from '../views/usuario_view';
import * as Yup from 'yup';
import crypto from 'crypto';
import { generateToken } from '../config/authentication';

/**
 * @author Gustavo Carvalho Silva
 * @since 14/11/2020
 */
export default {

  // essa função serve apenas para testes e deverá ser removida
  async index(req: Request, res: Response) {
    const usuarioRepository = getRepository(Usuario);

    const usuarios = await usuarioRepository.find({
      relations: ['perfil', 'curso']
    });

    return res.json(usuarioView.renderMany(usuarios));
  },

  /**
   * @author Gustavo Carvalho Silva
   * @since 18/11/2020
   * 
   * @description Recebe um id como parametro da rota em que for chamado e como resposta retorna o usuário com esse id conforme a view_usuario
   */
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.findOneOrFail(id, {
      relations: ['perfil', 'curso']
    });

    return res.json(usuarioView.render(usuario));
  },

  /**
   * @author Gustavo Carvalho Silva
   * @since 14/11/2020
   * 
   * @description cria um novo usuário com os parametros recebidos no corpo de uma requisição
   * 
   * corpo da request: 
   *  nome: string,
   *  username: string,
   *  senha: string,
   *  perfil: number,
   *  curso: number
   */
  async create(req: Request, res: Response) {
    const {
      nome,
      username,
      senha,
      perfil,
      curso,
    } = req.body;

    const usuarioRepository = getRepository(Usuario);

    const data = {
      nome,
      username,
      senha,
      curso,
      perfil,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      username: Yup.string().required(),
      senha: Yup.string().required(),
      curso: Yup.number().required(),
      perfil: Yup.number().required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    data.senha = crypto.createHash('md5').update(data.senha).digest("hex");

    const usuario = usuarioRepository.create(data);

    await usuarioRepository.save(usuario);

    return res.status(201).json(usuario);
  },

  async login(req: Request, res: Response) {
    const {
      username,
      senha
    } = req.body;

    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository
      .createQueryBuilder("usuario")
      .where("username = :username AND senha = MD5(:senha)", {username, senha})
      .getOne();

    if (usuario) {
      let token = generateToken(username);
      res.json({ auth: true, token });
    }
    else {
      res.json({ auth: false }).sendStatus(401)
    }
    
  }
}