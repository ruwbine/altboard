import { Module } from '@nestjs/common';

import { UserStatsModule } from '../user-stats/user-stats.module';
import { UserExperienceController } from './user-experience.controller';
import { UserExperienceService } from './user-experience.service';

@Module({
  imports: [UserStatsModule],
  controllers: [UserExperienceController],
  providers: [UserExperienceService],
})
export class UserExperienceModule {}
