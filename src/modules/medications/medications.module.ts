import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import {SupabaseModule} from "../../core/database/supabase/supabase.module";
import {PetsModule} from "../pets/pets.module";

@Module({
  imports: [SupabaseModule, PetsModule],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
