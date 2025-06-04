import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Twitter handle (without @)',
    example: 'user123',
    minLength: 1,
    maxLength: 15,
  })
  @IsString()
  @Length(1, 15)
  twitter: string;

  @ApiProperty({
    description: 'Ethereum wallet address',
    example: '0x742d35cc3c6e4e35cc6e4e35cc6e4e35cc6e4e35',
    minLength: 35,
    maxLength: 42,
  })
  @IsString()
  @Length(35, 42)
  wallet: string;
}
