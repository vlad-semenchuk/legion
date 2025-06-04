import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BadgeDto } from './badge.dto';

export class UserBadgeDto {
  @ApiProperty({
    description: 'The user ID who earned the badge',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    description: 'The badge ID that was earned',
    example: 'onchain-early-staker',
  })
  @IsString()
  @IsNotEmpty()
  badge_id: string;

  @ApiProperty({
    description: 'When the user earned the badge',
    example: '2025-06-03T20:48:38.043Z',
  })
  @IsDateString()
  earned_at: Date;

  @ApiProperty({
    description: 'The badge details',
    type: BadgeDto,
  })
  badge: BadgeDto;
}
