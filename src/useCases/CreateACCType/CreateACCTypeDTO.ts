import UnidadeDeMedida from '../../models/UnidadeDeMedida';
import VarianteDeAcc from '../../models/VarianteDaACC';

export interface ICreateACCTypeRequestDTO {
  nome: string;
  limite_de_pontos: number;
  descricao: string;
  pontuacao: number;
  unidade_de_medida: UnidadeDeMedida;
  variantes_de_acc: VarianteDeAcc[];
}
