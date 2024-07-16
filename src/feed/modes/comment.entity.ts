// comment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FeedPostEntity } from './post.entity';
import { UserEntity } from 'src/auth/models/user.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => FeedPostEntity, (feedPost) => feedPost.comment)
  post: FeedPostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comment)
  user: UserEntity;
}
