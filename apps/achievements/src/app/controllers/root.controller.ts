import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get('/')
  root() {
    return 'Legion Achievements says: Hello World!';
  }
}
