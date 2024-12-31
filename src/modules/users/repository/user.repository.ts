import { TypeormRepository } from 'src/common/interfaces/typeorm-repository.interface';
import { UserEntity } from '../entities/user.entity';
import { OnModuleInit } from '@nestjs/common';

export class UserRepository
  extends TypeormRepository<UserEntity>
  implements OnModuleInit
{
  onModuleInit() {
    console.log('User repository successfully started');
  }
  constructor() {
    super(UserEntity);
  }
}
