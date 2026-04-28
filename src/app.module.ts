import { Module } from '@nestjs/common'
import { AuthModule } from './core/auth/auth.module'
import { SupabaseModule } from './core/database/supabase/supabase.module'
import { WebhooksModule } from './webhooks/webhooks.module'
import {ConfigModule} from "@nestjs/config";
import supabaseConfig from "./core/database/supabase/config/supabase.config";
import clerkConfig from "./core/auth/clerk/config/clerk.config";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV || "local"}`,
        load: [supabaseConfig, clerkConfig],
      }),
    AuthModule,
    SupabaseModule,
    WebhooksModule
  ],
})
export class AppModule {}