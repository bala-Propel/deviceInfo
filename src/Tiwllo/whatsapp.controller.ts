// whatsapp.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import axios from 'axios';

@Controller('whatsapp')
export class WhatsAppController {
    constructor(private readonly whatsappService: WhatsAppService) { }
    @Post('send-sms')
    async sendSms(@Body('to') to: string, @Body('message') message: string) {
        try {
            const apiToken = "cc0BXQ9fRPqNYEtznaBsHg:APA91bHUGXBsx1zRGX7BEAVgdFw2PbJHIbTjJynUt_PukTsoUwTs0JOw2tWqAZ5kgikzLIsAaEK-xYIFMMLKXkWlM_Cr0twviS741yKKK9PnR-zsyHSTXN8";

            // Encode for Basic Authentication
            const encodedToken = Buffer.from(apiToken).toString('base64');

            const response = await axios.post(
                'http://192.0.0.2:8082/send',
                { to, message },
                {
                    headers: {
                        'Authorization': `Basic ${encodedToken}`, 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('SMS sent:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error sending SMS:', error.response?.data || error.message);
            throw error;
        }
    }

}
