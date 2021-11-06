import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendencesService } from './attendences.service';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';

@Controller('attendences')
export class AttendencesController {
  constructor(private readonly attendencesService: AttendencesService) {}

  @Post()
  create(@Body() createAttendenceDto: CreateAttendenceDto) {
    return this.attendencesService.create(createAttendenceDto);
  }

  @Get()
  findAll() {
    return this.attendencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendenceDto: UpdateAttendenceDto) {
    return this.attendencesService.update(+id, updateAttendenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendencesService.remove(+id);
  }
}
