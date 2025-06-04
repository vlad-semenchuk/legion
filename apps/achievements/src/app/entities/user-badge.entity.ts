import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { BadgeEntity } from './badge.entity';
import { UserEntity } from './user.entity';

@Entity('user_badges')
export class UserBadgeEntity {
  @PrimaryColumn({ name: 'user_id' })
  user_id: number;

  @PrimaryColumn({ name: 'badge_id' })
  badge_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => BadgeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'badge_id' })
  badge: BadgeEntity;
}
