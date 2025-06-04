import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBadgeEntity } from '../entities/user-badge.entity';

@Injectable()
export class UserBadgesService {
  @InjectRepository(UserBadgeEntity)
  private readonly repository: Repository<UserBadgeEntity>;

  async assignMany(
    assignments: { userId: number; badgeId: string }[],
  ): Promise<void> {
    const userBadges = assignments.map(({ userId, badgeId }) => {
      const userBadge = new UserBadgeEntity();
      userBadge.user_id = userId;
      userBadge.badge_id = badgeId;
      return userBadge;
    });

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(UserBadgeEntity)
      .values(userBadges)
      .orIgnore()
      .execute();
  }

  async findByUserId(userId: number): Promise<UserBadgeEntity[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ['badge'],
    });
  }
}
