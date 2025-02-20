import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsAppController } from './Tiwllo/whatsapp.controller';
import { WhatsAppService } from './Tiwllo/whatsapp.service';
import { SystemInfoController } from './deviceInfo/system-info.controller';
import { SystemInfoService } from './deviceInfo/system-info.service';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';

@Module({
  imports: [],
  controllers: [AppController, WhatsAppController, SystemInfoController],
  providers: [AppService, WhatsAppService, SystemInfoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimiterMiddleware).forRoutes('*'); // Apply globally
  }
}
