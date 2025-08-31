export class MonthlyPaymentMatrixDto {
  id: number;
  month: string;
  year: string;
  amount: number;
}

export class UserMonthlyPaymentDto {
  monthlyPaymentId: number;
  value: string; // Monto pagado o "0" si no pagó
}

export class UserMonthlyPaymentMatrixDto {
  id: number;
  name: string;
  blockNumber: string;
  payments: UserMonthlyPaymentDto[];
  totalPaid: number;
  totalOwed: number;
  paymentPercentage: number;
}

export class UsersMonthlyPaymentsMatrixDto {
  year: number;
  monthlyPayments: MonthlyPaymentMatrixDto[];
  users: UserMonthlyPaymentMatrixDto[];
  headers: string[];
  rows: string[][];
}
