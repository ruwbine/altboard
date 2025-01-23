import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IUsersStats } from '../interfaces/user-stats.interface';

@Entity('user_stats')
export class UserStatsEntity implements IUsersStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  exp: number;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  completedQuests: number;

  @Column({ default: 0 })
  createdQuests: number;

  @OneToOne(() => UserEntity, (user) => user.stats)
  user: UserEntity;

  @Column({ nullable: true })
  userId: string;
}
