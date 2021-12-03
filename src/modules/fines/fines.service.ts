import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, getManager, Repository } from 'typeorm';
import { Meeting } from '../meetings/entities/meeting.entity';
import { User } from '../user/entities/user.entity';
import { CreateFineDto } from './dto/create-fine.dto';
import { CreateManyFinesDto } from './dto/create-many-fines.dto';
import { FindByDateFinesDto } from './dto/find-by-date-fines.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { Fine } from './entities/fine.entity';
import { FinesRepository } from './fines.repository';

@Injectable()
export class FinesService {
  constructor(
    private fineRepository: FinesRepository,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
  ) {}

  async create(createFineDto: CreateFineDto) {
    const { userId, meetingId } = createFineDto;
    const fine = this.fineRepository.create(createFineDto);
    const user = await this.userRepository.findOne(userId, {
      select: ['id', 'name', 'email'],
    });
    const meeting = await this.meetingRepository.findOne(meetingId, {
      select: ['id', 'name', 'fine_amount', 'date'],
    });
    fine.user = user;
    fine.meeting = meeting;
    return this.fineRepository.save(fine);
  }

  async createMany(createManyFinesDto: CreateManyFinesDto) {
    const res = [];
    const { date, userId, meetingIds: ids } = createManyFinesDto;
    const meetingIds = JSON.parse(ids) as number[];
    const user = await this.userRepository.findOne(userId, {
      select: ['id', 'name', 'email'],
    });
    await getManager().transaction(async (transactionalEntityManager) => {
      for (let i = 0; i < meetingIds.length; i++) {
        const meetingId = meetingIds[i];
        const meeting = await this.meetingRepository.findOne(meetingId, {
          select: ['id', 'name', 'fine_amount', 'date'],
        });

        const fine = this.fineRepository.create();
        fine.date = date;
        fine.fine_paid = meeting.fine_amount;
        fine.meeting = meeting;
        fine.user = user;

        const partial = await transactionalEntityManager.save(fine);
        res.push(partial);
      }
    });

    return res;
  }

  async findAll() {
    const fines = await this.fineRepository.find({
      order: { date: 'ASC' },
      relations: ['user', 'meeting'],
    });

    return fines.map((f) => ({
      ...f,
      user: { id: f.user.id, name: f.user.name, email: f.user.email },
      meeting: {
        id: f.meeting.id,
        name: f.meeting.name,
        fine_amount: f.meeting.fine_amount,
        date: f.meeting.date,
      },
    }));
  }

  async findByUser(id: number) {
    const user = await this.userRepository.findOne(id);
    return this.fineRepository.findByUser(user);
  }

  async findOne(id: number) {
    const fine = await this.fineRepository.findOne(id, {
      relations: ['user', 'meeting'],
    });

    return {
      ...fine,
      user: { id: fine.user.id, name: fine.user.name, email: fine.user.email },
      meeting: {
        id: fine.meeting.id,
        name: fine.meeting.name,
        fine_amount: fine.meeting.fine_amount,
        date: fine.meeting.date,
      },
    };
  }

  async update(id: number, updateFineDto: UpdateFineDto) {
    const fine = await this.fineRepository.findOne(id, {
      relations: ['user', 'meeting'],
    });
    this.fineRepository.merge(fine, updateFineDto);

    const newFine = await this.fineRepository.save(fine);

    return {
      ...newFine,
      user: {
        id: newFine.user.id,
        name: newFine.user.name,
        email: newFine.user.email,
      },
      meeting: {
        id: newFine.meeting.id,
        name: newFine.meeting.name,
        fine_amount: newFine.meeting.fine_amount,
        date: newFine.meeting.date,
      },
    };
  }

  async remove(id: number) {
    const fine = await this.fineRepository.findOne(id, {
      relations: ['user', 'meeting'],
    });

    await this.fineRepository.delete(id);

    return {
      ...fine,
      user: {
        id: fine.user.id,
        name: fine.user.name,
        email: fine.user.email,
      },
      meeting: {
        id: fine.meeting.id,
        name: fine.meeting.name,
        fine_amount: fine.meeting.fine_amount,
        date: fine.meeting.date,
      },
    };
  }

  async getSumAmount() {
    return getManager()
      .createQueryBuilder(Fine, 'fine')
      .select('SUM(fine.fine_paid)', 'total')
      .getRawOne();
  }

  async findByDateRange(findByDateDto: FindByDateFinesDto) {
    const { initDate, endDate } = findByDateDto;
    const fines = await this.fineRepository.find({
      where: { date: Between(initDate, endDate) },
      relations: ['user', 'meeting'],
      order: { date: 'ASC' },
    });

    return fines.map((f) => ({
      ...f,
      user: { id: f.user.id, name: f.user.name, email: f.user.email },
      meeting: {
        id: f.meeting.id,
        name: f.meeting.name,
        fine_amount: f.meeting.fine_amount,
        date: f.meeting.date,
      },
    }));
  }
}
