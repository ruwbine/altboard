import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface IUsersStats {
  id: string;
  exp: number;
  level: number;
  createdQuests: number;
  completedQuests: number;
  user: IUser;
}
