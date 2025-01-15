import { Controller, Get } from '@nestjs/common';

import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    return await this._usersService.findAllUsers();
  }
}
