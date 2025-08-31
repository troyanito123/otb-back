import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { ExpensesService } from '../expenses/expenses.service';
import { MonthlyPaymentsMadeService } from '../monthly-payment-mades/monthly-payments-made.service';
import { IncomesService } from '../incomes/incomes.service';
import { FinesService } from '../fines/fines.service';
import { ExtraContributionsService } from '../extra-contributions/extra-contributions.service';
import { CertificationsService } from '../certifications/certifications.service';
import { DateRangeDto } from './dto/date-range.dto';
import { ContributionsPaidService } from '../contributions-paid/contributions-paid.service';
import { UsersMeetingsMatrixDto } from './dto/users-meetings-matrix.dto';
import { Meeting } from '../meetings/entities/meeting.entity';
import { User } from '../user/entities/user.entity';
import { Attendence } from '../attendences/entities/attendence.entity';
import { Fine } from '../fines/entities/fine.entity';

@Injectable()
export class ReportService {
  constructor(
    private expenseService: ExpensesService,
    private incomeService: IncomesService,
    private monthlyPaymentService: MonthlyPaymentsMadeService,
    private fineService: FinesService,
    private extraContributionService: ExtraContributionsService,
    private contributionService: ContributionsPaidService,
    private certificationService: CertificationsService,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Attendence)
    private attendenceRepository: Repository<Attendence>,
    @InjectRepository(Fine)
    private fineRepository: Repository<Fine>,
  ) {}

  async getSumIncomesByDate(dateRange: DateRangeDto) {
    const { initDate, endDate } = dateRange;
    const incomeSum = await this.incomeService.getSumByRange({
      initDate,
      endDate,
    });
    const monthlyPaymentSum = await this.monthlyPaymentService.getSumByRange({
      initDate,
      endDate,
    });
    const fineSum = await this.fineService.getSumByRange({ initDate, endDate });
    const extraSum = await this.extraContributionService.getSumByRange({
      initDate,
      endDate,
    });
    const contributionSum = await this.contributionService.getSumByRange({
      initDate,
      endDate,
    });
    const certificationSum = await this.certificationService.getSumByRange({
      initDate,
      endDate,
    });
    return {
      total:
        incomeSum + monthlyPaymentSum + fineSum + extraSum + contributionSum + certificationSum,
    };
  }

  async getSumExpensesByDate(dateRange: DateRangeDto) {
    const expenseSum = await this.expenseService.getSumByRange(dateRange);
    return { total: expenseSum };
  }

  async getUserMonthlyPayments(body: any) {
    return this.monthlyPaymentService.getUserMonty(body.block);
  }

  async getUsersMeetingsMatrix(year: number): Promise<UsersMeetingsMatrixDto> {
    // 1. Obtener reuniones del año ordenadas por fecha
    const meetings = await this.meetingRepository.find({
      where: {
        date: Between(new Date(`${year}-01-01`), new Date(`${year}-12-31`)),
      },
      order: { date: 'ASC' },
    });

    // 2. Obtener usuarios activos
    const users = await this.userRepository.find({
      where: { status: 'ACTIVE' },
      order: { name: 'ASC' },
    });

    // 3. Obtener asistencias del año
    const attendances = await this.attendenceRepository.find({
      where: { meeting: { id: In(meetings.map((m) => m.id)) } },
      relations: ['user', 'meeting'],
    });

    // 4. Obtener multas del año
    const fines = await this.fineRepository.find({
      where: { meeting: { id: In(meetings.map((m) => m.id)) } },
      relations: ['user', 'meeting'],
    });

    // 5. Crear matriz de datos
    const usersData = users.map((user) => {
      let totalFinesPaid = 0;
      let totalFinesOwed = 0;

      const userAttendances = meetings.map((meeting) => {
        // Verificar si asistió
        const attended = attendances.some(
          (att) => att.user.id === user.id && att.meeting.id === meeting.id,
        );

        if (attended) {
          return { meetingId: meeting.id, value: 'N/A' };
        } else {
          // No asistió, verificar si pagó multa
          const fine = fines.find((f) => f.user.id === user.id && f.meeting.id === meeting.id);

          const meetingFineAmount = meeting.fine_amount || 0;

          if (fine && fine.fine_paid > 0) {
            totalFinesPaid += fine.fine_paid;
            return { meetingId: meeting.id, value: fine.fine_paid.toString() };
          } else {
            totalFinesOwed += meetingFineAmount;
            return { meetingId: meeting.id, value: '0' };
          }
        }
      });

      const totalAttended = userAttendances.filter((att) => att.value === 'N/A').length;

      return {
        id: user.id,
        name: user.name,
        blockNumber: user.block_number,
        attendances: userAttendances,
        totalAttended,
        totalFinesPaid,
        totalFinesOwed,
      };
    });

    // 6. Crear headers dinámicos
    const headers = [
      'Usuario',
      'Bloque',
      ...meetings.map((m) => {
        const fineAmount = m.fine_amount || 0;
        return `${m.name} (Multa: $${fineAmount})`;
      }),
      'Asistencias',
      'Multas Pagadas',
      'Multas Pendientes',
    ];

    // 7. Crear rows para formato tabla
    const rows = usersData.map((user) => [
      user.name,
      user.blockNumber,
      ...user.attendances.map((att) => att.value),
      `${user.totalAttended}/${meetings.length}`,
      `$${user.totalFinesPaid}`,
      `$${user.totalFinesOwed}`,
    ]);

    return {
      year,
      meetings: meetings.map((m) => ({
        id: m.id,
        name: m.name,
        date: m.date.toISOString().split('T')[0], // formato YYYY-MM-DD
        fineAmount: m.fine_amount || 0,
      })),
      users: usersData,
      headers,
      rows,
    };
  }
}
