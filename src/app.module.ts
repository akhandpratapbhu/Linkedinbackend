import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.POSTGRESS_HOST,
      port:parseInt(process.env.POSTGRESS_PORT),
      username:process.env.POSTGRESS_USER,
      password:process.env.POSTGRESS_PASSWORD,
      database:process.env.POSTGRESS_DATABASE,
      autoLoadEntities:true,
      synchronize:true,

    }),
    FeedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
