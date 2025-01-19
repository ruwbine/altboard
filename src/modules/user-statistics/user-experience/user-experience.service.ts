import { Injectable } from '@nestjs/common';

import { IUsersStats } from '../user-stats/interfaces/user-stats.interface';
import { UserStatsService } from '../user-stats/services/user-stats.service';

@Injectable()
export class UserExperienceService {
  constructor(private usersStatsService: UserStatsService) {}
  async addExp(userId: string, amount: number) {
    const stats = await this.usersStatsService.getStats(userId);
    const updatedStats = this.updateExpAndLevel(stats, amount);

    return await this.usersStatsService.updateStats(userId, updatedStats);
  }

  private updateExpAndLevel(stats: IUsersStats, amount: number): IUsersStats {
    const newStats = { ...stats, exp: stats.exp + amount }; // Создаём копию объекта

    let levelsGained = 0;
    while (
      newStats.exp >= this.calculateMaxExp(newStats.level + levelsGained)
    ) {
      newStats.exp -= this.calculateMaxExp(newStats.level + levelsGained);
      levelsGained++;
    }

    newStats.level += levelsGained;
    return newStats;
  }

  private calculateMaxExp(level: number): number {
    const BASE_EXP = 100;
    const EXP_GROWTH_FACTOR = 1.011;
    const LEVEL_DIVIDER = 2;

    return Math.round(
      Math.pow(
        BASE_EXP,
        Math.pow(EXP_GROWTH_FACTOR, (level - 1) / LEVEL_DIVIDER),
      ),
    );
  }
}
