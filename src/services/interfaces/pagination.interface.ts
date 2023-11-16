export interface IPagination<T> {
  items: T[];
  page: number;
  totalCount: number;
  pageTotal: number;
  startIndex: number;
  endIndex: number;
}
