export interface IIndexACCTypeRequestDTO {
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
  name: string;
  unity_of_measurement: number;
  page: number;
  limit: number;
}
