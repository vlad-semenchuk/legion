import { ApiProperty } from '@nestjs/swagger';
import { BadgeDto } from './badge.dto';

export class BadgesGroupedResponseDto {
  @ApiProperty({
    description:
      'Badges grouped by type - each property is a badge type containing an array of badges',
    example: {
      onchain: [
        {
          id: 'onchain-early-staker',
          type: 'onchain',
          icon: 'onchain-icon.png',
          title: 'Early Staker',
          description:
            'Awarded for staking tokens within the first 100 blocks of genesis.',
          lore: 'When the chain was but a spark, you forged the first commitment. Validators still whisper of your courage.',
        },
      ],
      twitter: [
        {
          id: 'twitter-ecosystem-voice',
          type: 'twitter',
          icon: 'twitter-icon.png',
          title: 'Ecosystem Voice',
          description:
            'Awarded for tweeting consistently about the protocol and hitting 10,000+ impressions.',
          lore: 'In the realm of hashtags and handles, your words echoed far and wide, rallying the curious and the bold.',
        },
      ],
    },
    additionalProperties: {
      type: 'array',
      items: { $ref: '#/components/schemas/BadgeDto' },
    },
  })
  static create(
    groupedBadges: Record<string, BadgeDto[]>,
  ): BadgesGroupedResponseDto {
    const response = new BadgesGroupedResponseDto();
    Object.assign(response, groupedBadges);
    return response;
  }
}
