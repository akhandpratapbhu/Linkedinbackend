import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { FeedPostEntity } from 'src/feed/modes/post.entity';
import { FeedPost } from 'src/feed/modes/post.interface';
import { Repository, UpdateResult,DeleteResult } from 'typeorm';

@Injectable()
export class FeedService {

    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }
    createPost(user:User,feedpost: FeedPost):Observable<FeedPost>{  
        feedpost.author=user
        return from(this.feedPostRepository.save(feedpost))
    }
   
    findAllPost():Observable<FeedPost[]>{
        return from(this.feedPostRepository.find())
    }
    updateFeedPost(id,feedpost:FeedPost):Observable<UpdateResult>{
        return from(this.feedPostRepository.update(id,feedpost))
    }
    deleteFeedPost(id):Observable<DeleteResult>{
        return from(this.feedPostRepository.delete(id))
    }
 
    // findPostById(id: number): Observable<any> {
        
    //     return from(this.feedPostRepository.findOneById(id));
    //   }
    async findPostById(id: number): Promise<any> {
        const feedPost = await this.feedPostRepository.findOneById(id);
        if (!feedPost) {
          throw new NotFoundException(`Post with ID ${id} not found`);
        }
        const author = await this.userRepository.findOneById(feedPost.id); // Assuming 'authorId' is the foreign key
        return { ...feedPost, author };
      }
}

