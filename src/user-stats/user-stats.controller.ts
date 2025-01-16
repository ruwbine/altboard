import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { IUser } from 'src/users/interfaces/user.interface';

import { UserStatsService } from './services/user-stats.service';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get()
  async getStats(@User() user: IUser) {
    return this.userStatsService.getStats(user);
  }

  @Patch()
  async updateStats(@User() user: IUser) {}

  @Get('all')
  async getAllUsersStats() {
    return this.userStatsService.getAllStats();
  }
}
