import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { DownloadCertificateUseCase } from './DownloadCertificateUseCase';

export class DownloadCertificateController {
  private downloadCertificateUseCase: DownloadCertificateUseCase;

  constructor(downloadCertificateUseCase: DownloadCertificateUseCase) {
    this.downloadCertificateUseCase = downloadCertificateUseCase;
  }

  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const certificate = await this.downloadCertificateUseCase.execute({
      id: Number(id),
    });

    const buf2 = Buffer.from(certificate.file);
    fs.writeFile(
      path.join(__dirname, '..', '..', 'uploads', certificate.name),
      buf2,
      err => {
        if (!err) console.log('Data written');
      },
    );

    response.set(
      'Content-disposition',
      `attachment; filename=${certificate.name}`,
    );
    response.set('Content-Type', certificate.type);
    response.set('Content-Length', String(certificate.size));
    response.write(buf2);
    response.send();

    fs.unlinkSync(
      path.join(__dirname, '..', '..', 'uploads', certificate.name),
    );
  }
}
