import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import { User } from '../entities/User';
import { generateToken } from '../config/authentication';
import { Course } from '../entities/Course';
import { PROFILE } from '../constants/Profile';

/**
 * @author Gustavo Carvalho Silva
 * @since 14/11/2020
 */
export default {
  // essa função serve apenas para testes e deverá ser removida
  async index(req: Request, res: Response): Promise<any> {
    const { search, course } = req.query;
    let { profile_id } = req.query;
    const userRepository = getRepository(User);

    let queryUsuarios = userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course');

    if (search)
      if (Number(search))
        queryUsuarios = queryUsuarios.where({ cpf: Like(`%${search}%`) });
      else queryUsuarios = queryUsuarios.where({ name: Like(`%${search}%`) });

    if (course) {
      queryUsuarios = queryUsuarios.andWhere('course.id = :course', { course });
    }

    if (!profile_id) profile_id = String(PROFILE.STUDENT);

    queryUsuarios = queryUsuarios.andWhere('profile.id = :profile_id', {
      profile_id,
    });

    const usuarios = await queryUsuarios.getMany();

    return res.json({
      data: usuarios.map(user => ({
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        username: user.username,
        course: {
          id: user.course.id,
          name: user.course.name,
        },
      })),
    });
  },

  /**
   * @author Gustavo Carvalho Silva
   * @since 18/11/2020
   *
   * @description Recebe um id como parametro da rota em que for chamado e como resposta retorna o usuário com esse id conforme a view_usuario
   */
  async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id, {
      relations: ['profile', 'course'],
    });

    return res.json(user);
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
   *  password: string,
   *  profile: number,
   *  course: number
   */
  async create(req: Request, res: Response): Promise<any> {
    const { name, cpf, email, username, password, profile, course } = req.body;

    const userRepository = getRepository(User);

    const data = {
      name,
      cpf: String(cpf.replace(/\D/g, '')),
      email,
      username,
      password,
      course,
      profile,
    };

    const usuarioExistente = await userRepository.findOne({
      where: {
        username,
      },
    });

    if (usuarioExistente) {
      return res.status(401).json({ msg: 'Usuário já existe!' });
    }

    data.password = crypto
      .createHash('md5')
      .update(data.password)
      .digest('hex');

    const user = userRepository.create(data);

    await userRepository.save(user);

    return res.status(201).json(user);
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
   *  password: string,
   *  course: number
   */
  async createDiscente(req: Request, res: Response): Promise<any> {
    const { name, cpf, email, username, password, course } = req.body;

    const userRepository = getRepository(User);

    const data = {
      name,
      cpf,
      email,
      username,
      password,
      course,
      profile: <any>PROFILE.STUDENT,
    };

    const usuarioExistente = await userRepository.findOne({
      where: {
        username,
      },
    });

    if (usuarioExistente) {
      return res.status(401).json({ msg: 'Usuário já existe!' });
    }

    data.password = crypto
      .createHash('md5')
      .update(data.password)
      .digest('hex');

    const user = userRepository.create(data);

    await userRepository.save(user);

    return res.status(201).json(user);
  },

  async login(req: Request, res: Response): Promise<any> {
    const { username, password } = req.body;

    const userRepository = getRepository(User);

    const user = await userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course')
      .where('username = :username AND password = MD5(:password)', {
        username,
        password,
      })
      .getOne();

    if (user) {
      const token = generateToken(user.id, user.profile.id);
      res.json({
        auth: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          profile: user.profile,
          course: user.course,
        },
      });
    } else {
      res.json({ auth: false }).sendStatus(401);
    }
  },

  async findByPerfilGroupByCurso(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const cursoRepository = getRepository(Course);

    const cursos = await cursoRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.users', 'users')
      .where('users.profile.id = :id', { id })
      .getMany();

    res.json({ cursos });
  },

  async findByPerfilOld(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const userRepository = getRepository(User);

    const usuarios = await userRepository.find({
      relations: ['profile', 'course'],
      where: {
        profile: id,
      },
      order: {
        course: 1,
      },
    });

    res.json({ usuarios });
  },

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const userRepository = getRepository(User);

    const user = await userRepository.delete({ id: Number(id) });

    res.json({ user });
  },
};
