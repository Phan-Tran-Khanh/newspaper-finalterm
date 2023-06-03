export type SearchQueryType = {
  category: string | undefined;
  label: string | undefined;
  time: 'day' | 'week' | 'month' | 'all' | undefined;
  query: string | undefined;
  page: number | undefined;
  pageSize: number | undefined;
};

export class SearchQuery {
  category: string;
  label: string;
  time: 'day' | 'week' | 'month' | 'all';
  query: string;
  page: number;
  pageSize: number;

  constructor(query: SearchQueryType) {
    this.category = query.category || '';
    this.label = query.label || '';
    this.time = query.time || 'all';
    this.query = query.query || '';
    this.page = query.page || 1;
    this.pageSize = query.pageSize || 10;
  }
}
