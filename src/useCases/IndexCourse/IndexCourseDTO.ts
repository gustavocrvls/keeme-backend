export interface IIndexCourseRequestDTO {
  sortField?: string;
  sortOrder?: 'ASC' | 'DESC';
  nome?: string;
  page: number;
  limit: number;
}
