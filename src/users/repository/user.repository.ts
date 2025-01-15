import { Logger, OnModuleInit } from '@nestjs/common';
import { TypeormRepository } from 'src/common/interfaces/typeorm-repository.interface';

import { UserEntity } from '../entities/user.entity';

export class UserRepository
  extends TypeormRepository<UserEntity>
  implements OnModuleInit
{
  private _logger = new Logger();
  constructor() {
    super(UserEntity);
  }

  onModuleInit() {
    this._logger.log('Users repository successfully initialized');
  }
}
