import { Module } from '@nestjs/common'
import { ClerkWebhookController } from './clerk/clerk-webhook.controller'
import { SupabaseModule } from '../core/database/supabase/supabase.module'

@Module({
    imports: [SupabaseModule],
    controllers: [ClerkWebhookController],
})
export class WebhooksModule {}