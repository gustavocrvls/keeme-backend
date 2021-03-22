export interface IIndexACCTypeRequestDTO {
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
  nome: string;
  unidade_de_medida: number;
  page: number;
  limit: number;
}
