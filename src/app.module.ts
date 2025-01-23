import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ApiResponseInterceptor } from './common/api-response/interceptors/api-response.interceptor';
import { UserStatisticsModule } from './modules/user-statistics/user-statistics.module';
import { UsersModule } from './modules/users/users.module';
import { databaseConfig } from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    UserStatisticsModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ApiResponseInterceptor,
    },
  ],
})
export class AppModule {}
