export interface IIndexACCRequestDTO {
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
  page: number;
  limit: number;
  name: string;
  user: number;
  acc_type: number;
  acc_status: number;
  course: number;
}
