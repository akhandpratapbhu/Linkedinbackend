import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MailModule } from './mail/mail.module';
import { StripeController } from './stripe/controllers/stripe/stripe.controller';
import { StripeService } from './stripe/service/stripe/stripe.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres'|| 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'Admin',
      database: process.env.POSTGRES_DATABASE || 'linkedin',
      autoLoadEntities: true,
      synchronize: true,

    }),
    FeedModule,
    AuthModule,
    ChatModule,
    MailModule,
    NotificationModule,
  ],
  controllers: [AppController, StripeController],
  providers: [AppService, StripeService],
})
export class AppModule { }
