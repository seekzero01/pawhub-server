import { Module } from '@nestjs/common'
import { AuthModule } from './core/auth/auth.module'
import { SupabaseModule } from './core/database/supabase/supabase.module'
import { WebhooksModule } from './webhooks/webhooks.module'
import {ConfigModule} from "@nestjs/config";
import { PetsModule } from './modules/pets/pets.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { MedicationsModule } from './modules/medications/medications.module';
import supabaseConfig from "./core/database/supabase/config/supabase.config";
import clerkConfig from "./core/auth/config/clerk.config";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV || "local"}`,
        load: [supabaseConfig, clerkConfig],
      }),
    AuthModule,
    SupabaseModule,
    WebhooksModule,
    PetsModule,
    UsersModule,
    DashboardModule,
    AppointmentsModule,
    MedicationsModule
  ],
})
export class AppModule {}