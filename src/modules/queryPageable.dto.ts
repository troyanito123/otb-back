enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryPageable {
  keyword: string;
  sort: SortOrder;
  page: number;
  take: number;
  column?: string;
}
