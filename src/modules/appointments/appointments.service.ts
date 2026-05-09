import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../../core/database/supabase/supabase.service';
import { Appointment } from './types/appointments.types';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {PetsService} from "../pets/pets.service";

@Injectable()
export class AppointmentsService {
  constructor(
      private readonly supabase: SupabaseService,
      private readonly petsService: PetsService,
  ) {}

  async findAll(userId: string, petId: string): Promise<Appointment[]> {
    await this.petsService.assertOwnership(userId, petId);

    const { data, error } = await this.supabase.client
        .from('appointments')
        .select('*')
        .eq('pet_id', petId)
        .eq('user_id', userId)
        .order('scheduled_at', { ascending: true });

    if (error) {
      throw new InternalServerErrorException('Failed to fetch appointments');
    }

    return data as Appointment[];
  }

  async findOne(userId: string, petId: string, appointmentId: string): Promise<Appointment> {
    await this.petsService.assertOwnership(userId, petId);

    const { data, error } = await this.supabase.client
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .eq('pet_id', petId)
        .eq('user_id', userId)
        .single();

    if (!data) {
      throw new NotFoundException(`Appointment ${appointmentId} not found`);
    }

    if (error) {
      throw new InternalServerErrorException('Failed to fetch appointment');
    }

    return data as Appointment;
  }

  async create(userId: string, petId: string, dto: CreateAppointmentDto): Promise<Appointment> {
    await this.petsService.assertOwnership(userId, petId);

    const { data, error } = await this.supabase.client
        .from('appointments')
        .insert({
          ...dto,
          pet_id: petId,
          user_id: userId,
        })
        .select()
        .single();

    if (error) {
      throw new InternalServerErrorException('Failed to create appointment');
    }

    return data as Appointment;
  }

  async update(userId: string, petId: string, appointmentId: string, dto: UpdateAppointmentDto): Promise<Appointment> {
    await this.findOne(userId, petId, appointmentId);

    const { data, error } = await this.supabase.client
        .from('appointments')
        .update(dto)
        .eq('id', appointmentId)
        .eq('pet_id', petId)
        .eq('user_id', userId)
        .select()
        .single();

    if (error) {
      throw new InternalServerErrorException('Failed to update appointment');
    }

    return data as Appointment;
  }

  async remove(userId: string, petId: string, appointmentId: string): Promise<void> {
    await this.findOne(userId, petId, appointmentId);

    const { error } = await this.supabase.client
        .from('appointments')
        .delete()
        .eq('id', appointmentId)
        .eq('pet_id', petId)
        .eq('user_id', userId);

    if (error) {
      throw new InternalServerErrorException('Failed to delete appointment');
    }
  }
}