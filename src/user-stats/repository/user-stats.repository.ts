import { Logger, OnModuleInit } from '@nestjs/common';
import { TypeormRepository } from 'src/common/interfaces/typeorm-repository.interface';

import { UserStatsEntity } from '../entities/user-stats.entity';

export class UserStatsRepository
  extends TypeormRepository<UserStatsEntity>
  implements OnModuleInit
{
  private _logger = new Logger();

  constructor() {
    super(UserStatsEntity);
  }
  async onModuleInit() {
    this._logger.log('UserStats repository successfully started');
  }
}
