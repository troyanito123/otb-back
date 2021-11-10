enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindAllExpensesDto {
  keyword: string;
  sort: SortOrder;
  page: number;
  take: number;
}
