import { Injectable } from '@nestjs/common';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';

@Injectable()
export class AttendencesService {
  create(createAttendenceDto: CreateAttendenceDto) {
    return 'This action adds a new attendence';
  }

  findAll() {
    return `This action returns all attendences`;
  }

  findByUser(id: number) {
    return `This action returns all attendences for user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendence`;
  }

  update(id: number, updateAttendenceDto: UpdateAttendenceDto) {
    return `This action updates a #${id} attendence`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendence`;
  }
}
