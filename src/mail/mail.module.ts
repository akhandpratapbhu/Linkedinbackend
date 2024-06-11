import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './service/mail/mail.service';
import { MailController } from './controllers/mail/mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'akhandpratap121196@gmail.com', // replace with your email
          pass: 'qrfouinfzdcihiaz', // replace with your email password or app-specific password
        },
      },
    })
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
// auth: Contains authentication credentials.
// user: The Gmail account used to send emails.
// pass: The password for the Gmail account or an app-specific password if 2FA is enabled.

// "EmailHost": "smtp.gmail.com",
//   "EmailUsername": "arjun.netsmartz@gmail.com",
//   "EmailPassword": "rnprkmdxhceurdrx",
//   "EmailPort": "587",