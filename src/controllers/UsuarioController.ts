import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import Usuario from '../models/Usuario';
import usuarioView from '../views/usuario_view';
import { generateToken } from '../config/authentication';
import Curso from '../models/Curso';
import PERFIL from '../constants/Perfil';

/**
 * @author Gustavo Carvalho Silva
 * @since 14/11/2020
 */
export default {
  // essa função serve apenas para testes e deverá ser removida
  async index(req: Request, res: Response): Promise<any> {
    const { nome, curso } = req.query;
    let { profile_id } = req.query;
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

    if (!profile_id) profile_id = String(PERFIL.DISCENTE);

    queryUsuarios = queryUsuarios.andWhere('perfil.id = :profile_id', {
      profile_id,
    });

    const usuarios = await queryUsuarios.getMany();

    return res.json({ data: usuarios });
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
    const { nome, cpf, email, username, senha, perfil, curso } = req.body;

    const usuarioRepository = getRepository(Usuario);

    const data = {
      nome,
      cpf,
      email,
      username,
      senha,
      curso,
      perfil,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().required(),
      username: Yup.string().required(),
      senha: Yup.string().required(),
      curso: Yup.number().required(),
      perfil: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const usuarioExistente = await usuarioRepository.findOne({
      where: {
        username,
      },
    });

    if (usuarioExistente) {
      return res.status(401).json({ msg: 'Usuário já existe!' });
    }

    data.senha = crypto.createHash('md5').update(data.senha).digest('hex');

    const usuario = usuarioRepository.create(data);

    await usuarioRepository.save(usuario);

    return res.status(201).json(usuario);
  },

  /**
   * @author Gustavo Carvalho Silva
   * @since 14/11/2020
   *
   * @description cria um novo usuário do tipo discente com os parametros recebidos no corpo de uma requisição
   *
   * corpo da request:
   *  nome: string,
   *  username: string,
   *  senha: string,
   *  curso: number
   */
  async createDiscente(req: Request, res: Response): Promise<any> {
    const { nome, cpf, email, username, senha, curso } = req.body;

    const usuarioRepository = getRepository(Usuario);

    const data = {
      nome,
      cpf,
      email,
      username,
      senha,
      curso,
      perfil: <any>PERFIL.DISCENTE,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().required(),
      username: Yup.string().required(),
      senha: Yup.string().required(),
      curso: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const usuarioExistente = await usuarioRepository.findOne({
      where: {
        username,
      },
    });

    if (usuarioExistente) {
      return res.status(401).json({ msg: 'Usuário já existe!' });
    }

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

  async findByPerfilGroupByCurso(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const cursoRepository = getRepository(Curso);

    const cursos = await cursoRepository
      .createQueryBuilder('curso')
      .leftJoinAndSelect('curso.usuarios', 'usuarios')
      .where('usuarios.perfil.id = :id', { id })
      .getMany();

    res.json({ cursos });
  },

  async findByPerfilOld(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const usuarioRepository = getRepository(Usuario);

    const usuarios = await usuarioRepository.find({
      relations: ['perfil', 'curso'],
      where: {
        perfil: id,
      },
      order: {
        curso: 1,
      },
    });

    res.json({ usuarios });
  },

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.delete({ id: Number(id) });

    res.json({ usuario });
  },
};
