import { plainToInstance } from 'class-transformer';

import { UserEntity } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

export type SafeUserEntity = Omit<IUser, 'password'>;

export class UserMapper {
  static toIUserPublic({ password, ...safeUser }: UserEntity | IUser): IUser {
    return safeUser as SafeUserEntity;
  }

  static toIUserInternal(userEntity: UserEntity): IUser {
    return userEntity;
  }
}
