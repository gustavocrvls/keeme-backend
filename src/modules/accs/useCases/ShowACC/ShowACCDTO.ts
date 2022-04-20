import { ACC } from '../../model/ACC';

export interface IShowACCDTO {
  id: number;
}

export type ShowACCResponse = ACC & {
  certificate_url: string;
};
