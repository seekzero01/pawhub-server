import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PetsService } from '../pets/pets.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import {SupabaseService} from "../../core/database/supabase/supabase.service";
import {Medication} from "./types/medications.types";

@Injectable()
export class MedicationsService {
  constructor(
      private readonly supabase: SupabaseService,
      private readonly petsService: PetsService,
  ) {}

  async findAllByPet(
      userId: string,
      petId: string,
  ): Promise<Medication[]> {
    await this.petsService.assertOwnership(userId, petId);

    const { data, error } = await this.supabase.client
        .from('medications')
        .select('*')
        .eq('pet_id', petId)
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data as Medication[];
  }

  async findOne(
      userId: string,
      petId: string,
      medicationId: string,
  ): Promise<Medication> {
    await this.petsService.assertOwnership(userId, petId);

    const { data, error } = await this.supabase.client
        .from('medications')
        .select('*')
        .eq('id', medicationId)
        .eq('pet_id', petId)
        .single();

    if (error || !data) throw new NotFoundException('Medication not found');

    return data as Medication;
  }

  async create(
      userId: string,
      petId: string,
      dto: CreateMedicationDto,
  ): Promise<Medication> {
    await this.petsService.assertOwnership(userId, petId);

    const { data, error } = await this.supabase.client
        .from('medications')
        .insert({ ...dto, pet_id: petId })
        .select()
        .single();

    if (error || !data) throw new Error(error?.message ?? 'Insert failed');

    return data as Medication;
  }

  async update(
      userId: string,
      petId: string,
      medicationId: string,
      dto: UpdateMedicationDto,
  ): Promise<Medication> {
    await this.petsService.assertOwnership(userId, petId);

    const { data, error } = await this.supabase.client
        .from('medications')
        .update(dto)
        .eq('id', medicationId)
        .eq('pet_id', petId)
        .select()
        .single();

    if (error || !data) throw new NotFoundException('Medication not found');

    return data as Medication;
  }

  async remove(
      userId: string,
      petId: string,
      medicationId: string,
  ): Promise<void> {
    await this.petsService.assertOwnership(userId, petId);

    const { error } = await this.supabase.client
        .from('medications')
        .delete()
        .eq('id', medicationId)
        .eq('pet_id', petId);

    if (error) throw new NotFoundException('Medication not found');
  }
}