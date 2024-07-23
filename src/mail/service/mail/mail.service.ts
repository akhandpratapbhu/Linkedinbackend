import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) {}

    async sendUserConfirmation(user: any, token: string) {
      console.log("user",user);
      
      await this.mailerService.sendMail({
        to: user.email,
       // from:'akhandpratap121196@gmail.com',
        subject: 'Welcome to Linkedin App! Confirm your Email',
        text:'welcome',
        html:'welcome to sending mail vai nestjs and nodemailer'
     
      });
    }
    async sendUserConfirmationOtp(user: any, ) {
      console.log("user",user);
      
      await this.mailerService.sendMail({
        to: user.email,
       // from:'akhandpratap121196@gmail.com',
        subject: 'forget password to use otp for setting new password',
        
        html:'6 digit otp is-' + user.otp,
     
      });
    }
}
