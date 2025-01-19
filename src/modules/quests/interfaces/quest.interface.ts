import { IUser } from 'src/modules/users/interfaces/user.interface';

import { QuestDifficulty } from '../enums/quest-difficulty.enum';

export interface IQuest {
  id: number;
  title: string;
  description: string;
  expAmount: number;
  completed: boolean;
  createdAt: Date;
  difficulty: QuestDifficulty;
  updatedAt: Date;
  users: IUser[];
}
