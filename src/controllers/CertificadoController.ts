import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { Certificate } from '../entities/Certificate';

/**
 * @author Gustavo Carvalho Silva
 * @since 05/12/2020
 */
export default {
  /**
   * @author Gustavo Carvalho Silva
   * @since 05/12/2020
   *
   * @description Recebe um id como parametro da rota em que for chamado e como resposta retorna um link de download do arquivo
   */
  async download(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const certificadoRepository = getRepository(Certificate);
    const certificate = await certificadoRepository.findOneOrFail(id);

    const buf2 = Buffer.from(certificate.file);
    fs.writeFile(
      path.join(__dirname, '..', '..', 'uploads', certificate.name),
      buf2,
      err => {
        if (!err) console.log('Data written');
      },
    );

    res.set('Content-disposition', `attachment; filename=${certificate.name}`);
    res.set('Content-Type', certificate.type);
    res.set('Content-Length', String(certificate.size));
    res.write(buf2);
    res.send();

    fs.unlinkSync(
      path.join(__dirname, '..', '..', 'uploads', certificate.name),
    );

    // return res.json({url: `http://localhost:3333/uploads/${certificate.nome}`});
  },
};
