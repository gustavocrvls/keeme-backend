import {
  IArrayPaginatorProvider,
  IPaginatedArray,
} from '../IArrayPaginatorProvider';

export class ArrayPaginatorProvider implements IArrayPaginatorProvider {
  public paginate(
    items: any[],
    current_page: number,
    per_page_items: number,
    total_items: number,
  ): IPaginatedArray {
    const total_pages = Math.ceil(total_items / per_page_items);
    return {
      data: items,
      current_page: current_page || 1,
      per_page_items: per_page_items || items.length,
      total_items,
      total_pages: total_pages || 1,
    };
  }
}
