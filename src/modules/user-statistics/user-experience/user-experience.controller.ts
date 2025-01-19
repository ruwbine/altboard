import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/modules/users/decorators/user.decorator';
import { IUser } from 'src/modules/users/interfaces/user.interface';

import { UpdateStatsDto } from '../user-stats/dto/update-stats.dto';
import { UserExperienceService } from './user-experience.service';

@UseGuards(JwtAuthGuard)
@Controller('stats/experience')
export class UserExperienceController {
  constructor(private readonly expService: UserExperienceService) {}
  @Post()
  async updateExp(@User() user: IUser, @Body() dto: UpdateStatsDto) {
    console.log(user, dto);
    return await this.expService.addExp(user.id, dto.exp);
  }
}
