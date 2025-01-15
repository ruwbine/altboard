import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

import { UserStatsEntity } from './entities/user-stats.entity';
import { IUsersStats } from './interfaces/user-stats.interface';
import { UserStatsRepository } from './repository/user-stats.repository';

@Injectable()
export class UserStatsService {
  constructor(
    private readonly _statsRepo: UserStatsRepository,
    private readonly _usersService: UsersService,
  ) {}

  async getStats(user: IUser) {
    const stats = await this._statsRepo.findOneByParams({
      userId: user.id,
    });

    if (!stats) {
      return this._createEmptyStats(user);
    }
    return stats;
  }

  async getAllStats() {
    return this._statsRepo.findAll();
  }

  private async _createEmptyStats(user: IUser): Promise<IUsersStats> {
    const stats = new UserStatsEntity();
    stats.userId = user.id;
    return await this._statsRepo.create(stats);
  }
}
