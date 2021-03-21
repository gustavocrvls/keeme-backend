export interface IIndexACCTypeRequestDTO {
  sortField?: string;
  sortOrder?: 'ASC' | 'DESC';
  nome?: string;
  page: number;
  limit: number;
}
