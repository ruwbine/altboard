import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { databaseConfig } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatsModule } from './modules/user-stats/user-stats.module';
import { ApiResponseInterceptor } from './core/api-response/interceptors/api-response.interceptor';

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
