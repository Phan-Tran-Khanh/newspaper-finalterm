export type Page<T> = {
  content: T[];
  totalPage: number;
  page: number;
  pageSize: number;
};
