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
import { UserStatsEntity } from 'src/user-stats/entities/user-stats.entity';
import { Exclude } from 'class-transformer';

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
