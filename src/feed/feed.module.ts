import { Module } from '@nestjs/common';
import { FeedService } from './services/feed/feed.service';
import { FeedController } from './controllers/feed/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPostEntity } from './modes/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { IsCreatorGuard } from 'src/auth/guards/is-creator/is-creator.guard';
import { UserEntity } from 'src/auth/models/user.entity';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([FeedPostEntity,UserEntity]),],
  providers: [FeedService,IsCreatorGuard],
  controllers: [FeedController]
})
export class FeedModule {}
