import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Expense } from '../entities/expense.entity';

export class FindOneExpenseDto {
  @ExistsOnDatabase(Expense)
  id: number;
}
