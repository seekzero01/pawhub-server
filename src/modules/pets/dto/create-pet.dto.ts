import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
} from 'class-validator';
import type { PetSex, PetStatus } from '../types/pets.types';

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    species: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    breed?: string;

    @IsOptional()
    @IsEnum(['male', 'female', 'unknown'] satisfies PetSex[])
    sex?: PetSex;

    @IsOptional()
    @IsDateString({ strict: true })
    date_of_birth?: string;

    @IsOptional()
    @IsUrl()
    avatar_url?: string;

    @IsOptional()
    @IsBoolean()
    microchipped?: boolean;

    @IsOptional()
    @IsBoolean()
    spayed_neutered?: boolean;

    @IsOptional()
    @IsEnum(['active', 'inactive', 'deceased'] satisfies PetStatus[])
    status?: PetStatus;
}