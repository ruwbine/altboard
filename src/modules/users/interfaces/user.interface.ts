import { IUsersStats } from 'src/modules/user-statistics/user-stats/interfaces/user-stats.interface';

export interface IUser {
  id: string;
  username: string;
  password?: string;
  email: string;
  isEmailConfirmed?: boolean;
  lastLogin?: Date;
  stats?: IUsersStats;
  createdAt: Date;
  updatedAt: Date;
}
