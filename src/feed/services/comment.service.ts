// comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/models/user.entity';
import { CommentEntity } from '../modes/comment.entity';
import { FeedPostEntity } from '../modes/post.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async commentOnPost(userId: number, postId: number, content: string): Promise<CommentEntity> {
    const user = await this.userRepository.findOneById(userId);
    const post = await this.feedPostRepository.findOneById(postId);

    const comment = this.commentRepository.create({ user, post, content });
    return this.commentRepository.save(comment);
  }
  findAllComments(postId: number): Observable<CommentEntity[]> {
    return from(
      this.commentRepository.find({
        where: { post: { id: postId } },
        relations: ['user', 'post'],
      })
    );
  }
}
