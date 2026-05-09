import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
    IsIn,
} from 'class-validator';

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    vet_name?: string;

    @IsDateString()
    scheduled_at: string;

    @IsOptional()
    @IsIn(['upcoming', 'completed', 'cancelled'])
    status?: string;

    @IsOptional()
    @IsString()
    notes?: string;
}