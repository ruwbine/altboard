import { IsOptional } from 'class-validator';
import { IUsersStats } from 'src/user-stats/interfaces/user-stats.interface';

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  isEmailConfirmed?: boolean;

  @IsOptional()
  stats?: IUsersStats;
}
