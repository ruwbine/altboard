import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ApiResponseInterceptor } from './common/api-response/interceptors/api-response.interceptor';
import { databaseConfig } from './ormconfig';
import { UserStatsModule } from './user-stats/user-stats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    UserStatsModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ApiResponseInterceptor,
    },
  ],
})
export class AppModule {}
