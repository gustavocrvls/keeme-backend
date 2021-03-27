import { UnityOfMeasurement } from '../../entities/UnityOfMeasurement';
import VarianteDeAcc from '../../models/VarianteDaACC';

export interface ICreateACCTypeRequestDTO {
  nome: string;
  limite_de_pontos: number;
  descricao: string;
  pontuacao: number;
  unidade_de_medida: UnityOfMeasurement;
  variantes_de_acc: VarianteDeAcc[];
}
