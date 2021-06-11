export interface IFileStorageProvider {
  uploadFile(path: string, file: Express.Multer.File): Promise<void>;
  getFileUrl(path: string, filename: string): Promise<string>;
}
