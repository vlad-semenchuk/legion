import { Controller, Get, Param } from '@nestjs/common';

@Controller('achievements')
export class AppController {
  @Get('/badges')
  badges() {
    return 'Badges';
  }

  @Get('/:userId')
  userAchievements(@Param('userId') userId: string) {
    return `Legion Achievements says: Hello World! ${userId}`;
  }
}
