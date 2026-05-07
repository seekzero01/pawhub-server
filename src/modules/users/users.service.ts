import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {SupabaseService} from "../../core/database/supabase/supabase.service";
import {DbUser} from "./types/users.types";

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

    async getUser(clerkId: string): Promise<DbUser> {
        const { data, error } = await this.supabase.client
            .from('users')
            .select('*')
            .eq('clerk_id', clerkId)
            .single();

        if (error?.code === 'PGRST116' || !data) {
            throw new NotFoundException(
                `User with Clerk ID ${clerkId} not found in database`,
            );
        }

        if (error) {
            throw new InternalServerErrorException('Failed to fetch user');
        }

        return data as DbUser;
    }
}
