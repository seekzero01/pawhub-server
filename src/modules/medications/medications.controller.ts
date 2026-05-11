import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus, UseGuards
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import {CurrentUser} from "../../decorators/current-user.decorator";
import {AuthGuard} from "@thallesp/nestjs-better-auth";

@Controller('pets/:petId/medications')
@UseGuards(AuthGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Get()
  async findAll(
      @Param('petId', ParseUUIDPipe) petId: string,
      @CurrentUser('id') userId: string,
  ) {
    return await this.medicationsService.findAllByPet(userId, petId);
  }

  @Get(':medicationId')
  async findOne(
      @Param('petId', ParseUUIDPipe) petId: string,
      @Param('medicationId', ParseUUIDPipe) medicationId: string,
      @CurrentUser('id') userId: string,
  ) {
    return await this.medicationsService.findOne(userId, petId, medicationId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
      @Param('petId', ParseUUIDPipe) petId: string,
      @Body() dto: CreateMedicationDto,
      @CurrentUser('id') userId: string,
  ) {
    return await this.medicationsService.create(userId, petId, dto);
  }

  @Patch(':medicationId')
  async update(
      @Param('petId', ParseUUIDPipe) petId: string,
      @Param('medicationId', ParseUUIDPipe) medicationId: string,
      @Body() dto: UpdateMedicationDto,
      @CurrentUser('id') userId: string,
  ) {
    return this.medicationsService.update(
        userId,
        petId,
        medicationId,
        dto,
    );
  }

  @Delete(':medicationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
      @Param('petId', ParseUUIDPipe) petId: string,
      @Param('medicationId', ParseUUIDPipe) medicationId: string,
      @CurrentUser('id') userId: string,
  ) {
    return await this.medicationsService.remove(
        userId,
        petId,
        medicationId,
    );
  }
}
