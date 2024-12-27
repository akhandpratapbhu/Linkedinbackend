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
    createPost(user:User,feedpost: FeedPost,req:any){  
        feedpost.user=user
        feedpost.body=req.body.body
        feedpost.image=req?.file?.originalname; 
        return from(this.feedPostRepository.save(feedpost))
    }
    findAllPost():Observable<FeedPost[]>{
        return from(this.feedPostRepository.find({relations:['user'] }))
    }
    updateFeedPost(id,feedpost:FeedPost,req:any):Observable<UpdateResult>{
        feedpost.comments=feedpost.comments
        feedpost.likes=feedpost.likes
        feedpost.body=feedpost.body
        feedpost.image=req?.file?.originalname;
        return from(this.feedPostRepository.update(id,feedpost))
    }
    deleteFeedPost(id):Observable<DeleteResult>{
        return from(this.feedPostRepository.delete(id))
        
    }
    async findPostById(id: number): Promise<any> {
        const feedPost = await this.feedPostRepository.find( {where:{ id:id},relations:['user'] });
        if (!feedPost) {
          throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return feedPost;
      }
      
    }
 