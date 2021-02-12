import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import Certificado from '../models/Certificado';

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
    const certificadoRepository = getRepository(Certificado);
    const certificado = await certificadoRepository.findOneOrFail(id);

    const buf2 = Buffer.from(certificado.arquivo);
    fs.writeFile(
      path.join(__dirname, '..', '..', 'uploads', certificado.nome),
      buf2,
      err => {
        if (!err) console.log('Data written');
      },
    );

    res.set('Content-disposition', `attachment; filename=${certificado.nome}`);
    res.set('Content-Type', certificado.tipo);
    res.set('Content-Length', String(certificado.tamanho));
    res.write(buf2);
    res.send();

    // return res.json({url: `http://localhost:3333/uploads/${certificado.nome}`});
  },
};
