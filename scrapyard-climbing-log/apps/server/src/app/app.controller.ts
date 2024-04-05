import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('user/:userId/roles')
  getUserRoles(@Param('userId') userId: string) {
    return this.appService.getUserRoles(userId);
  }
}
