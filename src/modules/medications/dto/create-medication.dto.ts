import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsArray,
    IsDateString,
} from 'class-validator';

export class CreateMedicationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    form?: string;

    @IsString()
    @IsOptional()
    dosage?: string;

    @IsString()
    @IsOptional()
    frequency?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    times?: string[];

    @IsDateString()
    @IsNotEmpty()
    start_date: string;

    @IsDateString()
    @IsOptional()
    end_date?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @IsString()
    @IsOptional()
    notes?: string;
}