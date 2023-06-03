export type SearchQueryType = {
  category: string | undefined;
  label: string | undefined;
  time: 'day' | 'week' | 'month' | 'all' | undefined;
  query: string | undefined;
  page: number | undefined;
};

export class SearchQuery {
  category: string;
  label: string;
  time: 'day' | 'week' | 'month' | 'all';
  query: string;
  page: number;

  constructor(searchQuery: SearchQueryType) {
    this.category = searchQuery.category || '';
    this.label = searchQuery.label || '';
    this.time = searchQuery.time || 'all';
    this.query = searchQuery.query || '';
    this.page = searchQuery.page || 1;
  }
}
