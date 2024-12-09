export interface PagedResponse<T> {
  items: T[];
  total_items: number;
  total_pages: number;
  current_page: number;
}
