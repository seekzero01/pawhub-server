import {
  Injectable,
  NotFoundException,
  InternalServerErrorException, ForbiddenException,
} from '@nestjs/common';
import {SupabaseService} from "../../core/database/supabase/supabase.service";
import {Pet} from "./types/pets.types";
import {CreatePetDto} from "./dto/create-pet.dto";
import {UpdatePetDto} from "./dto/update-pet.dto";

@Injectable()
export class PetsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(userId: string): Promise<Pet[]> {
    const { data, error } = await this.supabase.client
        .from('pets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException('Failed to fetch pets');
    }

    return data as Pet[];
  }

  async findOne(userId: string, petId: string): Promise<Pet> {
    const { data, error } = await this.supabase.client
        .from('pets')
        .select('*')
        .eq('id', petId)
        .eq('user_id', userId)
        .single();

    if (!data) {
      throw new NotFoundException(`Pet ${petId} not found`);
    }

    if (error) {
      throw new InternalServerErrorException('Failed to fetch pet');
    }

    return data as Pet;
  }

  async create(userId: string, dto: CreatePetDto): Promise<Pet> {
    const { data, error } = await this.supabase.client
        .from('pets')
        .insert({
          ...dto,
          user_id: userId,
        })
        .select()
        .single();

    if (error) {
      throw new InternalServerErrorException('Failed to create pet');
    }

    return data as Pet;
  }

  async update(userId: string, petId: string, dto: UpdatePetDto): Promise<Pet> {
    await this.findOne(userId, petId);

    const { data, error } = await this.supabase.client
        .from('pets')
        .update(dto)
        .eq('id', petId)
        .eq('user_id', userId)
        .select()
        .single();

    if (error) {
      throw new InternalServerErrorException('Failed to update pet');
    }

    return data as Pet;
  }

  async remove(userId: string, petId: string): Promise<void> {
    await this.findOne(userId, petId);

    const { error } = await this.supabase.client
        .from('pets')
        .delete()
        .eq('id', petId)
        .eq('user_id', userId);

    if (error) {
      throw new InternalServerErrorException('Failed to delete pet');
    }
  }

  async assertOwnership(userId: string, petId: string): Promise<void> {
    const { data } = await this.supabase.client
        .from('pets')
        .select('id')
        .eq('id', petId)
        .eq('user_id', userId)
        .single();

    if (!data) {
      throw new ForbiddenException(`Pet ${petId} not found or access denied`);
    }
  }
}