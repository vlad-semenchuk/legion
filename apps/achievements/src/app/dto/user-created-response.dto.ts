import { ApiProperty } from '@nestjs/swagger';
import { BadgeDto } from './badge.dto';

export class UserCreatedResponseDto {
  @ApiProperty({
    description: 'The ID of the newly created user',
    example: 123,
  })
  id: number;

  @ApiProperty({
    description: 'Twitter handle of the user',
    example: 'user123',
  })
  twitter: string;

  @ApiProperty({
    description: 'Ethereum wallet address of the user',
    example: '0x742d35cc3c6e4e35cc6e4e35cc6e4e35cc6e4e35',
  })
  wallet: string;

  @ApiProperty({
    description: 'Badges automatically assigned to the user upon registration',
    type: [BadgeDto],
    example: [
      {
        id: 'twitter-ecosystem-voice',
        type: 'twitter',
        icon: '🐦',
        title: 'Ecosystem Voice',
        description:
          'Awarded for tweeting consistently about the protocol and hitting 10,000+ impressions',
        lore: 'In the realm of hashtags and handles, your words echoed far and wide, rallying the curious and the bold.',
      },
    ],
  })
  assignedBadges: BadgeDto[];
}
