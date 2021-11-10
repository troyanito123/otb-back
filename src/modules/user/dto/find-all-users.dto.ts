enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindAllUsersDto {
  keyword: string;
  sort: SortOrder;
  page: number;
  take: number;
}
