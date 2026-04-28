import {
    Controller,
    Post,
    Headers,
    UnauthorizedException,
    BadRequestException,
    type RawBodyRequest,
    Req,
} from '@nestjs/common'
import { Webhook } from 'svix'
import { Request } from 'express'
import { SupabaseService } from '../../core/database/supabase/supabase.service'
import {ConfigService} from "@nestjs/config";

interface ClerkUserCreatedEvent {
    type: 'user.created' | 'user.updated' | 'user.deleted'
    data: {
        id: string;
        email_addresses: Array<{ email_address: string; id: string }>
        primary_email_address_id: string
        first_name: string | null
        last_name: string | null
        image_url: string | null
    }
}

@Controller('webhooks/clerk')
export class ClerkWebhookController {
    private readonly webhookSecret: string

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly configService: ConfigService
    ) {
        this.webhookSecret = this.configService.getOrThrow<string>('clerk.webhookSecret')
    }

    @Post()
    async handleWebhook(
        @Headers('svix-id') svixId: string,
        @Headers('svix-timestamp') svixTimestamp: string,
        @Headers('svix-signature') svixSignature: string,
        @Req() req: RawBodyRequest<Request>,
    ) {
        if (!svixId || !svixTimestamp || !svixSignature) {
            throw new BadRequestException('Missing Svix headers')
        }

        const wh = new Webhook(this.webhookSecret)
        let event: ClerkUserCreatedEvent

        try {
            event = wh.verify(req.rawBody!.toString(), {
                'svix-id': svixId,
                'svix-timestamp': svixTimestamp,
                'svix-signature': svixSignature,
            }) as ClerkUserCreatedEvent
        } catch {
            throw new UnauthorizedException('Invalid webhook signature')
        }

        if (event.type === 'user.created') {
            const { id, email_addresses, primary_email_address_id, first_name, last_name } = event.data

            const primaryEmail = email_addresses.find(
                (e) => e.id === primary_email_address_id,
            )?.email_address

            if (!primaryEmail) throw new BadRequestException('No primary email found')

            const { error } = await this.supabaseService.adminClient
                .from('users')
                .upsert({
                    id,
                    email: primaryEmail,
                    first_name: first_name ?? null,
                    last_name: last_name ?? null,
                })

            if (error) throw new Error(`Failed to upsert user: ${error.message}`)
        }

        return { received: true }
    }
}