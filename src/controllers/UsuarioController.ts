import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import Usuario from '../models/Usuario';
import usuarioView from '../views/usuario_view';
import { generateToken } from '../config/authentication';

/**
 * @author Gustavo Carvalho Silva
 * @since 14/11/2020
 */
export default {
  // essa função serve apenas para testes e deverá ser removida
  async index(req: Request, res: Response): Promise<any> {
    const { nome, curso } = req.query;
    const usuarioRepository = getRepository(Usuario);

    let queryUsuarios = usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .leftJoinAndSelect('usuario.curso', 'curso');

    if (nome) {
      queryUsuarios = queryUsuarios.where({ nome: Like(`%${nome}%`) });
    }

    if (curso) {
      queryUsuarios = queryUsuarios.andWhere('curso.id = :curso', { curso });
    }

    const usuarios = await queryUsuarios.getMany();

    return res.json(usuarioView.renderMany(usuarios));
  },

  /**
   * @author Gustavo Carvalho Silva
   * @since 18/11/2020
   *
   * @description Recebe um id como parametro da rota em que for chamado e como resposta retorna o usuário com esse id conforme a view_usuario
   */
  async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.findOneOrFail(id, {
      relations: ['perfil', 'curso'],
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
  async create(req: Request, res: Response): Promise<any> {
    const { nome, username, senha, perfil, curso } = req.body;

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
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    data.senha = crypto.createHash('md5').update(data.senha).digest('hex');

    const usuario = usuarioRepository.create(data);

    await usuarioRepository.save(usuario);

    return res.status(201).json(usuario);
  },

  async login(req: Request, res: Response): Promise<any> {
    const { username, senha } = req.body;

    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .where('username = :username AND senha = MD5(:senha)', {
        username,
        senha,
      })
      .getOne();

    if (usuario) {
      const token = generateToken(usuario.id, usuario.perfil.id);
      res.json({
        auth: true,
        token,
        usuario: { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil },
      });
    } else {
      res.json({ auth: false }).sendStatus(401);
    }
  },
};
