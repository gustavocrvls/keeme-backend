export interface IIndexCourseRequestDTO {
  sortField?: string;
  sortOrder?: 'ASC' | 'DESC';
  name?: string;
  page: number;
  limit: number;
}
