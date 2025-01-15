import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';

import { UserStatsRepository } from './repository/user-stats.repository';

@Injectable()
export class UserStatsService {
  constructor(private readonly _statsRepo: UserStatsRepository) {}

  async getStats(user: IUser) {
    const stats = await this._statsRepo.findOneByParams({
      user: { id: user.id } as any,
    });

    if (!stats) {
      throw new NotFoundException(`User stats not found with ${user.id}`);
    }
    return stats;
  }
}
