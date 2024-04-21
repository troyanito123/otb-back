import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from '../meetings/entities/meeting.entity';
import { User } from '../user/entities/user.entity';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { Attendence } from './entities/attendence.entity';

@Injectable()
export class AttendencesService {
  constructor(
    @InjectRepository(Attendence)
    private attendenceRespository: Repository<Attendence>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
  ) {}

  async create(createAttendenceDto: CreateAttendenceDto) {
    const { userId, meetingId } = createAttendenceDto;
    const user = await this.userRepository.findOne(userId, {
      select: ['id', 'name', 'email'],
    });
    const meeting = await this.meetingRepository.findOne(meetingId);
    const attendence = this.attendenceRespository.create();
    attendence.user = user;
    attendence.meeting = meeting;
    return this.attendenceRespository.save(attendence);
  }

  async findAll() {
    const attendences = await this.attendenceRespository.find({
      relations: ['user', 'meeting'],
    });

    return attendences.map((a) => ({
      ...a,
      user: { id: a.user.id, name: a.user.name, email: a.user.email },
    }));
  }

  async findByUser(id: number) {
    const user = await this.userRepository.findOne(id, {
      select: ['id', 'name', 'email'],
    });
    const attendences = await this.attendenceRespository.find({
      where: { user },
      relations: ['user', 'meeting'],
    });

    return attendences.map((a) => ({
      ...a,
      user: { id: a.user.id, name: a.user.name, email: a.user.email },
    }));
  }

  async findByMeeting(id: number) {
    const meeting = await this.meetingRepository.findOne(id);
    const attendences = await this.attendenceRespository.find({
      where: { meeting },
      relations: ['user', 'meeting'],
    });

    return attendences.map((a) => ({
      ...a,
      user: { id: a.user.id, name: a.user.name, email: a.user.email },
    }));
  }

  async findOne(id: number) {
    const attendence = await this.attendenceRespository.findOne(id, {
      relations: ['user', 'meeting'],
    });

    return {
      ...attendence,
      user: {
        id: attendence.user.id,
        name: attendence.user.name,
        email: attendence.user.email,
      },
    };
  }

  async update(id: number, updateAttendenceDto: UpdateAttendenceDto) {
    const { userId, meetingId } = updateAttendenceDto;
    const user = await this.userRepository.findOne(userId, {
      select: ['id', 'name', 'email'],
    });
    const meeting = await this.meetingRepository.findOne(meetingId);

    const attendence = await this.attendenceRespository.findOne(id);
    attendence.user = user;
    attendence.meeting = meeting;

    return this.attendenceRespository.save(attendence);
  }

  async remove(id: number) {
    const attendence = await this.findOne(id);
    await this.attendenceRespository.delete(id);
    return attendence;
  }

  async findAllMeetingsByUser(id: number) {
    const meetings = await this.meetingRepository.find({
      order: { date: 'ASC' },
    });
    const attendences = await this.attendenceRespository.find({
      where: { user: { id } },
      relations: ['meeting'],
    });

    const mapAt = attendences.reduce(
      (a: Map<number, Attendence>, c) =>
        a.has(c.meeting.id) ? a : a.set(c.meeting.id, c),
      new Map<number, Attendence>(),
    );

    return meetings.map((m) => ({ ...m, isPresent: mapAt.has(m.id) }));
  }
}
