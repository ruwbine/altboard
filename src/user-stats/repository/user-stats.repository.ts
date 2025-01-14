import { Injectable } from '@nestjs/common';
import { TypeormRepository } from 'src/common/interfaces/typeorm-repository.interface';

import { UserStatsEntity } from '../entities/user-stats.entity';

export class UserStatsRepository extends TypeormRepository<UserStatsEntity> {
  constructor() {
    super(UserStatsEntity);
  }
}
