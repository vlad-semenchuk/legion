import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadgesGroupedResponseDto } from '../dto/badges-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserAchievementsResponseDto } from '../dto/user-achievements-response.dto';
import { UserCreatedResponseDto } from '../dto/user-created-response.dto';
import { AchievementsService } from '../services/achievements.service';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
  @Inject() private readonly service: AchievementsService;

  @Get('/badges')
  @ApiOperation({
    summary: 'Get all badges grouped by type',
    description:
      'Fetches all available badges and groups them by their badge type (e.g., onchain, twitter, etc.)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved badges grouped by type',
    type: BadgesGroupedResponseDto,
  })
  badges(): Promise<BadgesGroupedResponseDto> {
    return this.service.getBadges();
  }

  @Get('/:userId')
  @ApiOperation({
    summary: 'Get user achievements',
    description:
      'Fetches all badges earned by a specific user along with when they were earned',
  })
  @ApiParam({
    name: 'userId',
    type: 'number',
    description: 'The ID of the user to get achievements for',
    example: 123,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user achievements',
    type: UserAchievementsResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user ID provided',
  })
  userAchievements(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserAchievementsResponseDto> {
    return this.service.getUserAchievements(userId);
  }

  @Post('/users')
  @ApiOperation({
    summary: 'Register a new user with automatic badge assignment',
    description:
      'Creates a new user with the provided Twitter handle and Ethereum wallet address. ' +
      'Automatically assigns achievement badges if the user meets the criteria (Twitter handle in achievement list or wallet address in achievement list).',
  })
  @ApiResponse({
    status: 201,
    description:
      'User successfully created with any applicable badges assigned',
    type: UserCreatedResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data (malformed wallet address, invalid Twitter handle, etc.)',
  })
  @ApiResponse({
    status: 409,
    description:
      'User with this Twitter handle or wallet address already exists',
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserCreatedResponseDto> {
    return this.service.createUserWithBadgeAssignment(createUserDto);
  }
}
