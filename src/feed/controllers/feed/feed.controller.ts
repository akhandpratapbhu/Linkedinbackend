import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FeedPost } from 'src/feed/modes/post.interface';
import { FeedService } from 'src/feed/services/feed/feed.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
    constructor(private readonly feedService: FeedService) {}

    @Post()
    create(@Body()feedpost:FeedPost):Observable<FeedPost>{
    return this.feedService.createPost(feedpost)
    }
    @Get()
    findAll():Observable<FeedPost[]>{
        return this.feedService.findAllPost();
    }
    @Put(':id')
    updateFeedPost(@Param('id')id:number,@Body()feedpost:FeedPost):Observable<UpdateResult>{
        return this.feedService.updateFeedPost(id,feedpost)
    }
    @Delete(':id')
    deleteFeedPost(@Param('id') id:number):Observable<DeleteResult>{
        return this.feedService.deleteFeedPost(id)
    }
}
