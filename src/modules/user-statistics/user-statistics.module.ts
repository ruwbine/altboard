import { Module } from '@nestjs/common';

import { UserExperienceModule } from './user-experience/user-experience.module';
import { UserStatsModule } from './user-stats/user-stats.module';

@Module({
  imports: [UserStatsModule, UserExperienceModule],
})
export class UserStatisticsModule {}
