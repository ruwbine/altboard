import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/modules/users/interfaces/user.interface';
import { UsersService } from 'src/modules/users/users.service';

import { UpdateStatsDto } from '../dto/update-stats.dto';
import { UserStatsEntity } from '../entities/user-stats.entity';
import { IUsersStats } from '../interfaces/user-stats.interface';
import { UserStatsRepository } from '../repository/user-stats.repository';

@Injectable()
export class UserStatsService {
  constructor(
    private readonly statsRepo: UserStatsRepository,
    private readonly userService: UsersService,
  ) {}

  async getStats(userId: string) {
    const stats = await this.statsRepo.findOneByParams({
      userId,
    });

    return stats ?? (await this.initializeUserStats(userId));
  }

  async updateStats(userId: string, dto: UpdateStatsDto) {
    const stats = await this.statsRepo.findOneByParams({ userId });
    Object.assign(stats, dto);
    return await this.statsRepo.update(stats.id, stats);
  }
  async getAllStats() {
    return this.statsRepo.findAll();
  }

  private async createEmptyStats(userId: string): Promise<IUsersStats> {
    const stats = new UserStatsEntity();
    stats.userId = userId;
    return await this.statsRepo.create(stats);
  }

  private async initializeUserStats(userId: string): Promise<IUsersStats> {
    const stats = await this.createEmptyStats(userId);

    await this.userService.updateUser(userId, { stats });
    return stats;
  }
}
