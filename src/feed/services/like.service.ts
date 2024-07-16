// like.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/models/user.entity';
import { LikeEntity } from '../modes/like.entity';
import { FeedPostEntity } from '../modes/post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async likePost(userId: number, postId: number): Promise<LikeEntity> {
    const user = await this.userRepository.findOneById(userId);
    const post = await this.feedPostRepository.findOneById(postId);

    const like = this.likeRepository.create({ user, post });
    return this.likeRepository.save(like);
  }
}
