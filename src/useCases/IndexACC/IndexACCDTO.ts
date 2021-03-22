export interface IIndexACCRequestDTO {
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
  page: number;
  limit: number;
  nome: string;
  usuario: number;
  tipo_de_acc: number;
  status_da_acc: number;
}
