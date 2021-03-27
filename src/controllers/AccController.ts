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
        'status_da_acc',
        'tipo_de_acc',
        'tipo_de_acc.unidade_de_medida',
        'usuario',
        'usuario.perfil',
        'usuario.curso',
      ],
    });

    return res.json({data: accs});
  },

  async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const accRepository = getRepository(ACC);

    const acc = await accRepository.findOneOrFail(id, {
      relations: [
        'status_da_acc',
        'tipo_de_acc',
        'tipo_de_acc.unidade_de_medida',
        'usuario',
        'usuario.perfil',
        'usuario.curso',
        'certificado',
        'avaliacao_da_acc',
        'avaliacao_da_acc.usuario',
        'variante_de_acc',
      ],
    });
    return res.json();
  },

  async showByUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const accRepository = getRepository(ACC);

    const accs = await accRepository
      .createQueryBuilder('acc')
      .leftJoinAndSelect('acc.status_da_acc', 'status_da_acc')
      .leftJoinAndSelect('acc.tipo_de_acc', 'tipo_de_acc')
      .leftJoinAndSelect('tipo_de_acc.unidade_de_medida', 'unidade_de_medida')
      .leftJoinAndSelect('acc.usuario', 'usuario')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .leftJoinAndSelect('usuario.curso', 'curso')
      .where('usuario.id = :id', { id })
      .getMany();

      return res.json({data: accs.map(acc => ({
        id: acc.id,
        quantity: acc.quantity,
        certificate_id: acc.certificado.id,

        user: {
          id: acc.user.id,
          name: acc.user.nome,
          cpf: acc.user.cpf,
        },
        acc_type: {
          id: acc.acc_type.id,
          name: acc.acc_type.nome,
          unity_of_measurement: {
            id: acc.acc_type.unidade_de_medida.id,
            name: acc.acc_type.unidade_de_medida.nome,
          }
        },
      }))});
  },

  async showByStatus(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const accRepository = getRepository(ACC);

    const accs = await accRepository
      .createQueryBuilder('acc')
      .leftJoinAndSelect('acc.status_da_acc', 'status_da_acc')
      .leftJoinAndSelect('acc.tipo_de_acc', 'tipo_de_acc')
      .leftJoinAndSelect('tipo_de_acc.unidade_de_medida', 'unidade_de_medida')
      .leftJoinAndSelect('acc.usuario', 'usuario')
      .leftJoinAndSelect('usuario.perfil', 'perfil')
      .leftJoinAndSelect('usuario.curso', 'curso')
      .where('status_da_acc.id = :id', { id })
      .getMany();

    return res.json({data: accs.map(acc => ({
      id: acc.id,
      quantity: acc.quantity,
      user: {
        id: acc.user.id,
        name: acc.user.nome,
        cpf: acc.user.cpf,
      },
      acc_type: {
        id: acc.acc_type.id,
        name: acc.acc_type.nome,
        unity_of_measurement: {
          id: acc.acc_type.unidade_de_medida.id,
          name: acc.acc_type.unidade_de_medida.nome,
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
        .leftJoinAndSelect('acc.status_da_acc', 'status_da_acc')
        .leftJoinAndSelect('acc.tipo_de_acc', 'tipo_de_acc')
        .leftJoinAndSelect('tipo_de_acc.unidade_de_medida', 'unidade_de_medida')
        .leftJoinAndSelect('acc.usuario', 'usuario')
        .leftJoinAndSelect('acc.variante_de_acc', 'variante_de_acc')
        .leftJoinAndSelect('usuario.perfil', 'perfil')
        .leftJoinAndSelect('usuario.curso', 'curso')
        .select(
          'SUM(acc.quantidade * variante_de_acc.pontos_por_unidade)',
          'pontos',
        )
        .addSelect('status_da_acc.id', 'status')
        .addSelect('tipo_de_acc.limite_de_pontos', 'limite')
        .groupBy('tipo_de_acc.id')
        .where('usuario.id = :id AND status_da_acc.id = :id_status', {
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
    const { quantidade, descricao, idUsuario, tipoDeAcc, variante_de_acc } = req.body;

    const requestCertificado = req.files as Express.Multer.File[];
    const certificadoReq = requestCertificado[0];

    const accData = {
      quantidade,
      descricao,
      usuario: idUsuario,
      tipo_de_acc: tipoDeAcc,
      variante_de_acc,
      certificado: {
        nome: certificadoReq.filename,
        tamanho: certificadoReq.size,
        tipo: certificadoReq.mimetype,
        arquivo: fs.readFileSync(certificadoReq.path),
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
