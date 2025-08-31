export class MeetingMatrixDto {
  id: number;
  name: string;
  date: string;
  fineAmount: number;
}

export class UserAttendanceDto {
  meetingId: number;
  value: string; // 'N/A', '0', o monto de multa pagada
}

export class UserMatrixDto {
  id: number;
  name: string;
  blockNumber: string;
  attendances: UserAttendanceDto[];
  totalAttended: number;
  totalFinesPaid: number;
  totalFinesOwed: number;
}

export class UsersMeetingsMatrixDto {
  year: number;
  meetings: MeetingMatrixDto[];
  users: UserMatrixDto[];
  headers: string[];
  rows: string[][];
}
