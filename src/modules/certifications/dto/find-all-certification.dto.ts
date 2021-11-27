enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindAllCertificationDto {
  keyword: string;
  page: number;
  take: number;
  sort: SortOrder;
  column: string;
}
