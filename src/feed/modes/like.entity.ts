// like.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FeedPostEntity } from './post.entity';
import { UserEntity } from 'src/auth/models/user.entity';

@Entity('like')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FeedPostEntity, (feedPost) => feedPost.like)
  post: FeedPostEntity;

  @ManyToOne(() => UserEntity, (user) => user.like)
  user: UserEntity;
}
