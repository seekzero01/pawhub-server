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
  UseGuards
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {Pet} from "./types/pets.types";
import {CurrentUser} from "../../decorators/current-user.decorator";
import {ClerkAuthGuard} from "../../core/auth/guard/clerk-auth.guard";

@Controller('pets')
@UseGuards(ClerkAuthGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async findAll(@CurrentUser("id") userId: string): Promise<Pet[]> {
    return this.petsService.findAll(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
      @CurrentUser("id") userId: string,
      @Body() dto: CreatePetDto,
  ): Promise<Pet> {
    return this.petsService.create(userId, dto);
  }

  @Get(':petId')
  async findOne(
      @CurrentUser("id") userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
  ): Promise<Pet> {
    return this.petsService.findOne(userId, petId);
  }

  @Patch(':petId')
  async update(
      @CurrentUser("id") userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
      @Body() dto: UpdatePetDto,
  ): Promise<Pet> {
    return this.petsService.update(userId, petId, dto);
  }

  @Delete(':petId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
      @CurrentUser("id") userId: string,
      @Param('petId', ParseUUIDPipe) petId: string,
  ): Promise<void> {
    return this.petsService.remove(userId, petId);
  }
}
