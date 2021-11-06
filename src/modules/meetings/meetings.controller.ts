import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/authorization/role.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { FindOneMeetingDto } from './dto/find-one-meeting.dto';

@Controller('meetings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @Roles(RoleOptions.Admin)
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(createMeetingDto);
  }

  @Get()
  findAll() {
    return this.meetingsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneMeetingDto) {
    return this.meetingsService.findOne(params.id);
  }

  @Put(':id')
  @Roles(RoleOptions.Admin)
  update(
    @Param() params: FindOneMeetingDto,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return this.meetingsService.update(params.id, updateMeetingDto);
  }

  @Delete(':id')
  @Roles(RoleOptions.Admin)
  remove(@Param() params: FindOneMeetingDto) {
    return this.meetingsService.remove(params.id);
  }
}
