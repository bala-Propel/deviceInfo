import { Controller, Post, Body } from '@nestjs/common';
import { VonageMessagingService } from './vonage.service';


@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: VonageMessagingService) {}

  @Post('send-sms')
  async sendSms(@Body() body: { to: string; message: string }) {
    return await this.messagingService.sendSms(body.to, body.message);
  }

  @Post('send-email')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    return await this.messagingService.sendEmail(body.to, body.subject, body.text);
  }
}
