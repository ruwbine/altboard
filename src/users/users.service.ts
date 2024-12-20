import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserCreateDto } from '../auth/dto/user-create.dto';
import { UserMapper } from './mappers/user.mapper';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit(): any {
    console.log('Users service implemented successfully');
  }

  constructor(private readonly userRepository: UserRepository) {}

  async isExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneByParams({ email });
    return !!user;
  }

  async findByEmail(email: string, forPassword: boolean): Promise<IUser> {
    const user = await this.userRepository.findOneByParams({ email });
    if (!user) {
      throw new NotFoundException(`Cannot find user with email ${email}`);
    }
    return forPassword
      ? UserMapper.toIUserInternal(user)
      : UserMapper.toIUserPublic(user);
  }

  async create(createUserDto: UserCreateDto): Promise<IUser> {
    return await this.userRepository.create(createUserDto);
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userRepository.findOneByParams({ id });
    if (!user) {
      throw new NotFoundException(`Cannot find user with id: ${id}`);
    }
    return UserMapper.toIUserPublic(user);
  }
}
