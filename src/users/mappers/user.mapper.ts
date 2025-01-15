import { plainToInstance } from 'class-transformer';

import { UserEntity } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

export type SafeUserEntity = Omit<IUser, 'password'>;

export class UserMapper {
  static toIUserPublic(userEntity: UserEntity | IUser): IUser {
    const safeUser: SafeUserEntity = { ...userEntity };

    return safeUser;
  }

  static toIUserInternal(userEntity: UserEntity): IUser {
    return userEntity;
  }
}
