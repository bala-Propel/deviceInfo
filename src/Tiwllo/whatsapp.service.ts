// whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Twilio } from 'twilio';

@Injectable()
export class WhatsAppService {
    private twilioClient: Twilio;
    constructor() {
        this.twilioClient = new Twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }
    async twilio(to: string): Promise<any> {
        try {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const response = await this.twilioClient.messages.create({
                from: process.env.TWILIO_WHATSAPP_NUMBER,
                to: `whatsapp:${to}`,
                body: `Your OTP is: ${otp}`,
            });
            console.log('OTP sent:', response.sid);
            return { success: true, messageSid: response.sid };
        } catch (error) {
            console.error('Error sending OTP via WhatsApp:', error);
            throw error;
        }
    }
    private gatewayUrl = 'http://your-phone-ip:8080/send';
    async sendSms(to: string, message: string) {
        try {
            const response = await axios.post(this.gatewayUrl, {
                to,
                message,
            });

            console.log('SMS sent:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    }
}
