import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BadgeDto {
  @ApiProperty({
    description: 'Unique identifier for the badge',
    example: 'onchain-early-staker',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  id: string;

  @ApiProperty({
    description: 'Type/category of the badge',
    example: 'onchain',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  type: string;

  @ApiProperty({
    description: 'Icon URL for the badge',
    example: '/assets/icons/onchain-icon.png',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  iconUrl: string;

  @ApiProperty({
    description: 'Display title of the badge',
    example: 'Early Staker',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @ApiProperty({
    description: 'Description of what the badge represents',
    example:
      'Awarded for staking tokens within the first 100 blocks of genesis.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Lore/backstory of the badge',
    example:
      'When the chain was but a spark, you forged the first commitment. Validators still whisper of your courage.',
  })
  @IsString()
  @IsNotEmpty()
  lore: string;
}
