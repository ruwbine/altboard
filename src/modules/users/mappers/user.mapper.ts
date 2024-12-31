import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

export class UserMapper {
  static toIUserPublic(userEntity: UserEntity | IUser): IUser {
    return plainToInstance(UserEntity, userEntity, {
      excludeExtraneousValues: true,
    });
  }

  static toIUserInternal(userEntity: UserEntity): IUser {
    return userEntity;
  }
}
