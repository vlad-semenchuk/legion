import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { UserBadgeDto } from './user-badge.dto';

export class UserAchievementsResponseDto {
  @ApiProperty({
    description: 'The user ID',
    example: 123,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Array of badges earned by the user',
    type: [UserBadgeDto],
    example: [
      {
        user_id: 123,
        badge_id: 'onchain-early-staker',
        earned_at: '2025-06-03T20:48:38.043Z',
        badge: {
          id: 'onchain-early-staker',
          type: 'onchain',
          icon: 'onchain-icon.png',
          title: 'Early Staker',
          description:
            'Awarded for staking tokens within the first 100 blocks of genesis.',
          lore: 'When the chain was but a spark, you forged the first commitment. Validators still whisper of your courage.',
        },
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserBadgeDto)
  badges: UserBadgeDto[];

  @ApiProperty({
    description: 'Total count of badges earned by the user',
    example: 5,
  })
  @IsNumber()
  totalCount: number;
}
