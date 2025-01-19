import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { QuestDifficulty } from '../enums/quest-difficulty.enum';
import { IQuest } from '../interfaces/quest.interface';

export class QuestEntity implements IQuest {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  expAmount: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'enum', enum: QuestDifficulty })
  difficulty: QuestDifficulty;

  @ManyToMany(() => UserEntity, (user) => user, { eager: true })
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
