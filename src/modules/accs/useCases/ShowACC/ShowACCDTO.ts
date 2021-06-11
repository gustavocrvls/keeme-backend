import { ACC } from '../../../../entities/ACC';

export interface IShowACCDTO {
  id: number;
}

export type ShowACCResponse = ACC & {
  certificate_url: string;
};
