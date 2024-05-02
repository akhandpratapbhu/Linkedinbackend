import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { FeedPostEntity } from 'src/feed/modes/post.entity';
import { FeedPost } from 'src/feed/modes/post.interface';
import { Repository, UpdateResult,DeleteResult } from 'typeorm';

@Injectable()
export class FeedService {

    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>
    ) { }
    createPost(user:User,feedpost: FeedPost):Observable<FeedPost>{  
      //  feedpost.author=user
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
}

