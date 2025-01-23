import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { IUser } from 'src/modules/users/interfaces/user.interface';

import { QuestDifficulty } from '../enums/quest-difficulty.enum';
import { IQuest } from '../interfaces/quest.interface';

export class CreateQuestDto
  implements Omit<IQuest, 'id' | 'createdAt' | 'updatedAt' | 'users'>
{
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  expAmount: number;

  @IsBoolean()
  completed: boolean;

  @IsEnum(QuestDifficulty)
  difficulty: QuestDifficulty;
}
