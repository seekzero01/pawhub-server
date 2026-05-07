import {Injectable} from '@nestjs/common';
import {SupabaseService} from "../../core/database/supabase/supabase.service";

@Injectable()
export class DashboardService {
  constructor(private readonly supabase: SupabaseService) {}

  async getDashboardData(userId: string): Promise<any> {
    return { message: `User ${userId}` };
  }
}
