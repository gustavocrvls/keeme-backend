export interface IFileStorageProvider {
  uploadFile(path: string, file: Express.Multer.File): Promise<void>;
}
