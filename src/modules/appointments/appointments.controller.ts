import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './types/appointments.types';
import { CurrentUser } from '../../decorators/current-user.decorator';
import {AuthGuard} from "@thallesp/nestjs-better-auth";

@Controller('pets/:petId/appointments')
@UseGuards(AuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async findAll(
      @CurrentUser('id') userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
  ): Promise<Appointment[]> {
    return await this.appointmentsService.findAll(userId, petId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
      @CurrentUser('id') userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
      @Body() dto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentsService.create(userId, petId, dto);
  }

  @Get(':appointmentId')
  async findOne(
      @CurrentUser('id') userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
      @Param('appointmentId', ParseUUIDPipe) appointmentId: string,
  ): Promise<Appointment> {
    return await this.appointmentsService.findOne(userId, petId, appointmentId);
  }

  @Patch(':appointmentId')
  async update(
      @CurrentUser('id') userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
      @Param('appointmentId', ParseUUIDPipe) appointmentId: string,
      @Body() dto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentsService.update(userId, petId, appointmentId, dto);
  }

  @Delete(':appointmentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
      @CurrentUser('id') userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
      @Param('appointmentId', ParseUUIDPipe) appointmentId: string,
  ): Promise<void> {
    return await this.appointmentsService.remove(userId, petId, appointmentId);
  }
}