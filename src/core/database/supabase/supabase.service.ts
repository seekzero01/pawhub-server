import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

@Injectable()
export class SupabaseService {
    readonly adminClient: SupabaseClient
    private readonly url: string
    private readonly anonKey: string

    constructor(private readonly configService: ConfigService) {
        this.url = this.configService.getOrThrow<string>('supabase.url')
        this.anonKey = this.configService.getOrThrow<string>('supabase.key')
        const serviceRoleKey = this.configService.getOrThrow<string>('supabase.roleKey')

        this.adminClient = createClient(this.url, serviceRoleKey)
    }

    getClientForUser(clerkToken: string): SupabaseClient {
        return createClient(this.url, this.anonKey, {
            async accessToken() {
                return clerkToken
            },
        })
    }
}