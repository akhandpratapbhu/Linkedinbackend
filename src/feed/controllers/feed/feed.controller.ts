import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/decorators/role/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { FeedPost } from 'src/feed/modes/post.interface';
import { FeedService } from 'src/feed/services/feed/feed.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
    constructor(private readonly feedService: FeedService) { }


   
    @UseGuards(JwtGuard, RolesGuard)
   // @Roles(Role.Admin)
    @Post()
    create(@Body() feedpost: FeedPost, @Request() req) {
        return this.feedService.createPost(req.user, feedpost)
    }
    @Get()
    findAll(): Observable<FeedPost[]> {
        return this.feedService.findAllPost();
    }
    @Put(':id')
    updateFeedPost(@Param('id') id: number, @Body() feedpost: FeedPost): Observable<UpdateResult> {
        return this.feedService.updateFeedPost(id, feedpost)
    }
    @Delete(':id')
    deleteFeedPost(@Param('id') id: number): Observable<DeleteResult> {
        return this.feedService.deleteFeedPost(id)
    }
}
