import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

import { UserStatsEntity } from '../entities/user-stats.entity';
import { IUsersStats } from '../interfaces/user-stats.interface';
import { UserStatsRepository } from '../repository/user-stats.repository';

@Injectable()
export class UserStatsService {
  constructor(
    private readonly statsRepo: UserStatsRepository,
    private readonly userService: UsersService,
  ) {}

  async getStats(user: IUser) {
    const stats = await this.statsRepo.findOneByParams({
      userId: user.id,
    });

    return stats ?? (await this.initializeUserStats(user));
  }

  async getAllStats() {
    return this.statsRepo.findAll();
  }

  private async createEmptyStats(user: IUser): Promise<IUsersStats> {
    const stats = new UserStatsEntity();
    stats.userId = user.id;
    return await this.statsRepo.create(stats);
  }

  private async initializeUserStats(user: IUser): Promise<IUsersStats> {
    const stats = await this.createEmptyStats(user);

    await this.userService.updateUser(user.id, { stats });
    return stats;
  }
}
