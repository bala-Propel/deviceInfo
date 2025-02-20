import { Injectable } from '@nestjs/common';
import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth'; // Import Auth from @vonage/auth
import Mailgun from 'mailgun.js';
import formData from 'form-data';

@Injectable()
export class VonageMessagingService {
  private vonage: Vonage;
  private mailgunClient;

  constructor() {
    const auth = new Auth({
      apiKey: 'VONAGE_API_KEY',
      apiSecret: 'VONAGE_API_SECRET',
    });

    this.vonage = new Vonage(auth); // Pass auth object here
    
    this.mailgunClient = new Mailgun(formData).client({
      username: 'api',
      key: 'MAILGUN_API_KEY',
    });
  }

  async sendSms(to: string, message: string) {
    return this.vonage.sms.send({ to, from: 'YourBrand', text: message });
  }

  async sendEmail(to: string, subject: string, text: string) {
    return this.mailgunClient.messages.create('YOUR_DOMAIN', {
      from: 'your-email@example.com',
      to,
      subject,
      text,
    });
  }
}
