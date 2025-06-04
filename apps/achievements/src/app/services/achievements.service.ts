import { Inject, Injectable } from '@nestjs/common';
import { BadgeDto } from '../dto/badge.dto';
import { BadgesGroupedResponseDto } from '../dto/badges-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserAchievementsResponseDto } from '../dto/user-achievements-response.dto';
import { UserBadgeDto } from '../dto/user-badge.dto';
import { UserCreatedResponseDto } from '../dto/user-created-response.dto';
import { BadgeEntity } from '../entities/badge.entity';
import { UserBadgeEntity } from '../entities/user-badge.entity';
import { AchievementCacheService } from './achievement-cache.service';
import { BadgeService } from './badge.service';
import { UserBadgesService } from './user-badges.service';
import { UserService } from './user.service';
import {
  ONCHAIN_ACHIEVEMENT_BADGE_ID,
  TWITTER_ACHIEVEMENT_BADGE_ID,
} from '../constants';

@Injectable()
export class AchievementsService {
  @Inject() private readonly badgeService: BadgeService;
  @Inject() private readonly userBadgesService: UserBadgesService;
  @Inject() private readonly userService: UserService;
  @Inject() private readonly achievementCacheService: AchievementCacheService;

  async getBadges(): Promise<BadgesGroupedResponseDto> {
    const groupedBadges = await this.badgeService.findAll();

    const transformedBadges: Record<string, BadgeDto[]> = {};

    for (const [badgeType, badges] of Object.entries(groupedBadges)) {
      transformedBadges[badgeType] = badges.map((badge) =>
        this.transformBadgeEntityToDto(badge),
      );
    }

    return BadgesGroupedResponseDto.create(transformedBadges);
  }

  async getUserAchievements(
    userId: number,
  ): Promise<UserAchievementsResponseDto> {
    const userBadges = await this.userBadgesService.findByUserId(userId);

    const transformedUserBadges = userBadges.map((userBadge) =>
      this.transformUserBadgeEntityToDto(userBadge),
    );

    return {
      userId,
      badges: transformedUserBadges,
      totalCount: transformedUserBadges.length,
    };
  }

  async createUserWithBadgeAssignment(
    createUserDto: CreateUserDto,
  ): Promise<UserCreatedResponseDto> {
    const user = await this.userService.createUser(createUserDto);

    const eligibleBadges: string[] = [];

    if (this.achievementCacheService.isTwitterEligible(createUserDto.twitter)) {
      eligibleBadges.push(TWITTER_ACHIEVEMENT_BADGE_ID);
    }

    if (this.achievementCacheService.isWalletEligible(createUserDto.wallet)) {
      eligibleBadges.push(ONCHAIN_ACHIEVEMENT_BADGE_ID);
    }

    const assignedBadges: BadgeEntity[] = [];
    if (eligibleBadges.length > 0) {
      const badges = await this.badgeService.findByIds(eligibleBadges);

      const assignments = badges.map((badge) => ({
        userId: user.id,
        badgeId: badge.id,
      }));

      await this.userBadgesService.assignMany(assignments);
      assignedBadges.push(...badges);
    }

    return {
      id: user.id,
      twitter: user.twitter,
      wallet: user.wallet,
      assignedBadges: assignedBadges.map((badge) => ({
        id: badge.id,
        type: badge.type,
        iconUrl: this.buildIconUrl(badge.icon),
        title: badge.title,
        description: badge.description,
        lore: badge.lore,
      })),
    };
  }

  private transformBadgeEntityToDto(entity: BadgeEntity): BadgeDto {
    const dto = new BadgeDto();
    dto.id = entity.id;
    dto.type = entity.type;
    dto.iconUrl = this.buildIconUrl(entity.icon);
    dto.title = entity.title;
    dto.description = entity.description;
    dto.lore = entity.lore;
    return dto;
  }

  private transformUserBadgeEntityToDto(entity: UserBadgeEntity): UserBadgeDto {
    const dto = new UserBadgeDto();
    dto.user_id = entity.user_id;
    dto.badge_id = entity.badge_id;
    dto.earned_at = entity.created_at;
    dto.badge = this.transformBadgeEntityToDto(entity.badge);
    return dto;
  }

  private buildIconUrl(iconFilename: string): string {
    return `/assets/icons/${iconFilename}`;
  }
}
