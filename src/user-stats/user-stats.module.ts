import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

import { UserStatsEntity } from './entities/user-stats.entity';
import { UserStatsRepository } from './repository/user-stats.repository';
import { UserStatsService } from './services/user-stats.service';
import { UserStatsController } from './user-stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatsEntity]), UsersModule],
  controllers: [UserStatsController],
  providers: [UserStatsService, UserStatsRepository],
})
export class UserStatsModule {}
