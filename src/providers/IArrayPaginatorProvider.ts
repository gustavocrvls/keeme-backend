export interface IPaginatedArray {
  data: any[];
  current_page: number;
  per_page_items: number;
  total_items: number;
  total_pages: number;
}

export interface IArrayPaginatorProvider {
  paginate(
    items: any[],
    current_page: number,
    per_page_items: number,
    total_items: number,
  ): IPaginatedArray;
}
