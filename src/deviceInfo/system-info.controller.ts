import { Controller, Get, Headers } from '@nestjs/common';
import { SystemInfoService } from './system-info.service';

@Controller()
export class SystemInfoController {
  constructor(private readonly systemInfoService: SystemInfoService) { }

  @Get()
  async getSystemInfo(@Headers('user-agent') userAgent: string) {
    return await this.systemInfoService.getSystemInfo(userAgent);
  }
  @Get('testforRatelimit')
  async testforRatelimit() {
    return "You Are Permited"
  }
}
