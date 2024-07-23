import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from 'src/mail/service/mail/mail.service';

@Controller('mail')
export class MailController {

    constructor(private readonly mailService: MailService) {}

    @Post('send-confirmation')
    async sendConfirmation(@Body() body: { email: string; name: string; token: string }) {
      const user = { email: body.email, name: body.name };
      return await this.mailService.sendUserConfirmation(user, body.token);
    }
    @Post('send-otp')
    async sendConfirmationOtp(@Body() body: {  email: string; otp: string }) {
      const user = {email: body.email, otp: body.otp };
      return await this.mailService.sendUserConfirmationOtp(user);
    }
}
