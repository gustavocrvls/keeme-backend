export interface ICreateACCDTO {
  quantity: number;
  description: string;
  user: number;
  acc_type: number;
  acc_variant: number;
  certificate: Express.Multer.File;
}
