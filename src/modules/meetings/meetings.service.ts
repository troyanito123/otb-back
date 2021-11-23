import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
  ) {}

  create(createMeetingDto: CreateMeetingDto) {
    const meeting = this.meetingRepository.create(createMeetingDto);
    return this.meetingRepository.save(meeting);
  }

  findAll() {
    return this.meetingRepository.find({ order: { date: 'ASC' } });
  }

  findOne(id: number) {
    return this.meetingRepository.findOne(id);
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    const meeting = await this.meetingRepository.findOne(id);
    this.meetingRepository.merge(meeting, updateMeetingDto);
    return this.meetingRepository.save(meeting);
  }

  async remove(id: number) {
    const meeting = await this.meetingRepository.findOne(id);
    await this.meetingRepository.delete(id);
    return meeting;
  }
}
