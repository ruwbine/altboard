import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseInterceptor } from './common/api-response/interceptors/api-response.interceptor';
import { UserStatsModule } from './user-stats/user-stats.module';

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
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ApiResponseInterceptor,
    },
  ],
})
export class AppModule {}
