import {Controller, Get, UseGuards} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {CurrentUser} from "../../decorators/current-user.decorator";
import {ClerkAuthGuard} from "../../core/auth/guard/clerk-auth.guard";

@Controller('dashboard')
@UseGuards(ClerkAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboardData(@CurrentUser("clerk_id") userId: string): Promise<any> {
    return this.dashboardService.getDashboardData(userId);
  }
}
