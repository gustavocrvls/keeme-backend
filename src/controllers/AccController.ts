/* eslint-disable prettier/prettier */
/* eslint-disable no-template-curly-in-string */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import fs from 'fs';
import { ACC } from '../entities/ACC';
import { ACC_STATUS } from '../constants/ACCStatus';

interface IPontuacaoPorTipo {
  tipo: number;
  limite: number;
  pontos: number;
}

/**
 * @author Gustavo Carvalho Silva
 * @since 19/11/2020
 *
 */
export default {
  /**
   *
   * @deprecated
   */
  async index(req: Request, res: Response): Promise<any> {
    const accRepository = getRepository(ACC);

    const accs = await accRepository.find({
      relations: [
        'acc_status',
        'acc_type',
        'acc_type.unity_of_measurement',
        'user',
        'user.profile',
        'user.course',
      ],
    });

    return res.json({data: accs});
  },

  async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const accRepository = getRepository(ACC);

    const acc = await accRepository.findOneOrFail(id, {
      relations: [
        'acc_status',
        'acc_type',
        'acc_type.unity_of_measurement',
        'user',
        'user.profile',
        'user.course',
        'certificate',
        'avaliacao_da_acc',
        'avaliacao_da_acc.user',
        'variante_de_acc',
      ],
    });
    return res.json(acc);
  },

  async showByUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const accRepository = getRepository(ACC);

    const accs = await accRepository
      .createQueryBuilder('acc')
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect('acc_type.unity_of_measurement', 'unity_of_measurement')
      .leftJoinAndSelect('acc.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course')
      .where('user.id = :id', { id })
      .getMany();

      return res.json({data: accs.map(acc => ({
        id: acc.id,
        quantity: acc.quantity,
        certificate_id: acc.certificate.id,

        user: {
          id: acc.user.id,
          name: acc.user.name,
          cpf: acc.user.cpf,
        },
        acc_type: {
          id: acc.acc_type.id,
          name: acc.acc_type.name,
          unity_of_measurement: {
            id: acc.acc_type.unity_of_measurement.id,
            name: acc.acc_type.unity_of_measurement.name,
          }
        },
      }))});
  },

  async showByStatus(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const accRepository = getRepository(ACC);

    const accs = await accRepository
      .createQueryBuilder('acc')
      .leftJoinAndSelect('acc.acc_status', 'acc_status')
      .leftJoinAndSelect('acc.acc_type', 'acc_type')
      .leftJoinAndSelect('acc_type.unity_of_measurement', 'unity_of_measurement')
      .leftJoinAndSelect('acc.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.course', 'course')
      .where('acc_status.id = :id', { id })
      .getMany();

    return res.json({data: accs.map(acc => ({
      id: acc.id,
      quantity: acc.quantity,
      user: {
        id: acc.user.id,
        name: acc.user.name,
        cpf: acc.user.cpf,
      },
      acc_type: {
        id: acc.acc_type.id,
        name: acc.acc_type.name,
        unity_of_measurement: {
          id: acc.acc_type.unity_of_measurement.id,
          name: acc.acc_type.unity_of_measurement.name,
        }
      }
    }))});
  },

  async summary(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const contarPontos = (accs: IPontuacaoPorTipo[]) => {
      let acumulador = 0;
      accs.map(acc => {
        acumulador += acc.pontos > acc.limite ? acc.limite : acc.pontos;
        return acumulador;
      });
      return acumulador;
    };

    const getPontuacaoByStatus = async (user_id: string, status: number) => {
      const accRepository = getRepository(ACC);

      const pontuacaoByStatus = await accRepository
        .createQueryBuilder('acc')
        .leftJoinAndSelect('acc.acc_status', 'acc_status')
        .leftJoinAndSelect('acc.acc_type', 'acc_type')
        .leftJoinAndSelect('acc_type.unity_of_measurement', 'unity_of_measurement')
        .leftJoinAndSelect('acc.user', 'user')
        .leftJoinAndSelect('acc.variante_de_acc', 'variante_de_acc')
        .leftJoinAndSelect('user.profile', 'profile')
        .leftJoinAndSelect('user.course', 'course')
        .select(
          'SUM(acc.quantity * variante_de_acc.pontos_por_unidade)',
          'pontos',
        )
        .addSelect('acc_status.id', 'status')
        .addSelect('acc_type.limite_de_pontos', 'limite')
        .groupBy('acc_type.id')
        .where('user.id = :id AND acc_status.id = :id_status', {
          id: user_id,
          id_status: status,
        })
        .getRawMany();

      return pontuacaoByStatus;
    };

    const pontuacaoStatusEmAnalise = await getPontuacaoByStatus(
      id,
      ACC_STATUS.UNDER_ANALYSIS,
    );
    const pontuacaoStatusAprovada = await getPontuacaoByStatus(
      id,
      ACC_STATUS.APPROVED,
    );
    const pontuacaoStatusNegada = await getPontuacaoByStatus(
      id,
      ACC_STATUS.FAILED,
    );

    const pontosEmAnalise = contarPontos(pontuacaoStatusEmAnalise);
    const pontosAprovados = contarPontos(pontuacaoStatusAprovada);
    const pontosNegados = contarPontos(pontuacaoStatusNegada);

    return res.json({
      resumo: { pontosEmAnalise, pontosAprovados, pontosNegados },
    });
  },

  async create(req: Request, res: Response): Promise<any> {
    const { quantity, description, user, acc_type, acc_variant } = req.body;

    const requestCertificado = req.files as Express.Multer.File[];
    const certificadoReq = requestCertificado[0];

    const accData = {
      quantity,
      description,
      user,
      acc_type,
      acc_variant,
      certificate: {
        name: certificadoReq.filename,
        size: certificadoReq.size,
        type: certificadoReq.mimetype,
        file: fs.readFileSync(certificadoReq.path),
      }
    };

    const accRepository = getRepository(ACC);

    const acc = accRepository.create(accData);

    await accRepository.save(acc);

    fs.unlinkSync(certificadoReq.path);

    return res.sendStatus(201);
  },

  async remover(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const accRepository = getRepository(ACC);

    const accRemovida = (await accRepository.findOne(id)) || new ACC();
    await accRepository.remove(accRemovida);

    res.sendStatus(200);
  },

  async updateStatus(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { new_status } = req.body;

    const accRepository = getRepository(ACC);

    const updated = await accRepository.update(id, { acc_status: new_status });

    res.send(updated);
  },
};
