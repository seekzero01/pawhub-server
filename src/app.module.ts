import { Module } from '@nestjs/common'
import { SupabaseModule } from './core/database/supabase/supabase.module'
import {ConfigModule} from "@nestjs/config";
import { PetsModule } from './modules/pets/pets.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { MedicationsModule } from './modules/medications/medications.module';
import supabaseConfig from "./core/database/supabase/config/supabase.config";
import {AuthModule} from "@thallesp/nestjs-better-auth";
import {auth} from "./lib/auth";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ".env",
        load: [supabaseConfig],
      }),
    AuthModule.forRoot({ auth }),
    SupabaseModule,
    PetsModule,
    UsersModule,
    DashboardModule,
    AppointmentsModule,
    MedicationsModule
  ],
})
export class AppModule {}