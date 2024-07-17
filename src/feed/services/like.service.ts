// like.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/models/user.entity';
import { LikeEntity } from '../modes/like.entity';
import { FeedPostEntity } from '../modes/post.entity';
import { from, Observable } from 'rxjs';
import { Like } from '../modes/like.interface';

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
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.feedPostRepository.findOne({ where: { id: postId } });

    if (!user || !post) {
      throw new NotFoundException('User or Post not found');
    }
    const existingLike = await this.likeRepository.findOne({ where: { user, post } });

    if (existingLike) {
      await this.likeRepository.remove(existingLike);
      return null;
    } else {
      const like = this.likeRepository.create({ user, post });
      return this.likeRepository.save(like);
    }

  }
  findAllLikes(postId: number) {
    return from(
      this.likeRepository.find({
        where: { post: { id: postId } },
        relations: ['user', 'post'],
      })
    );
  }
}
