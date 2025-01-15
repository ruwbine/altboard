import { Exclude } from 'class-transformer';
import { UserStatsEntity } from 'src/user-stats/entities/user-stats.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'user' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @OneToOne(() => UserStatsEntity, (userStats) => userStats.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  stats: UserStatsEntity;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
