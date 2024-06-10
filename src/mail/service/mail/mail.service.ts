import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) {}

    async sendUserConfirmation(user: any, token: string) {
      console.log("user",user);
      
      await this.mailerService.sendMail({
        to: user.email,
        from:'akhandbhu11@gmail.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        text:'welcome',
        html:'welcome to sending mail vai nestjs and nodemailer'
      //  template: './confirmation', // `.hbs` extension is appended automatically
        // context: { // ✏️ filling curly brackets with content
        //   name: user.name,
        //   url: `example.com/auth/confirm?token=${token}`,
        // },
      });
    }
}
