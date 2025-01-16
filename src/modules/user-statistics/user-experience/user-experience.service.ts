import { Injectable } from '@nestjs/common';

import { IUsersStats } from '../user-stats/interfaces/user-stats.interface';
import { UserStatsService } from '../user-stats/services/user-stats.service';

@Injectable()
export class UserExperienceService {
  constructor(private usersStatsService: UserStatsService) {}
  async addExp(userId: string, amount: number) {
    const stats = await this.usersStatsService.getStats(userId);
    const updatedStats = await this.updateExpAndLevel(
      stats,
      amount,
      this.calculateMaxExp(stats.level),
    );

    return await this.usersStatsService.updateStats(userId, updatedStats);
  }

  private updateExpAndLevel(
    stats: IUsersStats,
    amount: number,
    maxExp: number,
  ): IUsersStats {
    const newStats = { ...stats, exp: stats.exp + amount }; // Создаём копию объекта

    if (newStats.exp >= maxExp) {
      newStats.level++;
      newStats.exp -= maxExp;
    }

    return newStats; // Возвращаем новый объект
  }

  private calculateMaxExp(level: number): number {
    const BASE_EXP = 100; // Начальное значение опыта
    const EXP_GROWTH_FACTOR = 1.011; // Фактор роста опыта
    const LEVEL_DIVIDER = 2;

    return Math.round(
      Math.pow(
        BASE_EXP,
        Math.pow(EXP_GROWTH_FACTOR, (level - 1) / LEVEL_DIVIDER),
      ),
    );
  }
}
