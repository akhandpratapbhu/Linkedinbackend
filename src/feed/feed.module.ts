import { Module } from '@nestjs/common';
import { FeedService } from './services/feed/feed.service';
import { FeedController } from './controllers/feed/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPostEntity } from './modes/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { IsCreatorGuard } from 'src/auth/guards/is-creator/is-creator.guard';
import { UserEntity } from 'src/auth/models/user.entity';
import { LikeEntity } from './modes/like.entity';
import { CommentEntity } from './modes/comment.entity';
import { CommentService } from './services/comment.service';
import { LikeService } from './services/like.service';
import { CommentController } from './controllers/feed/comment.controller';
import { LikeController } from './controllers/like.controller';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([FeedPostEntity,UserEntity,LikeEntity,CommentEntity]),],
  providers: [FeedService,CommentService,LikeService,IsCreatorGuard],
  controllers: [FeedController,CommentController,LikeController]
})
export class FeedModule {}
