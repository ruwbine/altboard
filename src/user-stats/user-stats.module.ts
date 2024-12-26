import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatsEntity } from './entities/user-stats.entity';
import { UsersModule } from 'src/users/users.module';
import { UserStatsService } from './user-stats.service';
import { UserStatsController } from './user-stats.controller';

@Module({   
    imports: [TypeOrmModule.forFeature([UserStatsEntity]),
    UsersModule],
    controllers: [UserStatsController],
    providers: [UserStatsService]
})
export class UserStatsModule {}
