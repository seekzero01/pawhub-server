import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import {PetsModule} from "../pets/pets.module";
import {SupabaseModule} from "../../core/database/supabase/supabase.module";

@Module({
  imports: [PetsModule, SupabaseModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
