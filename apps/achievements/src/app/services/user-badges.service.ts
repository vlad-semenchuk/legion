import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBadge } from '../entities/user-badge.entity';

@Injectable()
export class UserBadgesService {
  @InjectRepository(UserBadge)
  private readonly repository: Repository<UserBadge>;

  async assign(useBadge: UserBadge): Promise<UserBadge> {
    return this.repository.save(useBadge);
  }

  async assignMany(
    assignments: { userId: number; badgeId: string }[],
  ): Promise<void> {
    const userBadges = assignments.map(({ userId, badgeId }) => {
      const userBadge = new UserBadge();
      userBadge.user_id = userId;
      userBadge.badge_id = badgeId;
      return userBadge;
    });

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(UserBadge)
      .values(userBadges)
      .orIgnore()
      .execute();
  }

  async findByuserId(userId: number): Promise<UserBadge[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ['badge'],
    });
  }
}
