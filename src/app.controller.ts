import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInfo } from '../types';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): AppInfo {
    return this.appService.getHello();
  }
}
