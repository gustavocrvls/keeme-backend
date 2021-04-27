export interface IIndexUserRequestDTO {
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
  page: number;
  limit: number;
  search: string;
  course: number;
  profile: number;
}
