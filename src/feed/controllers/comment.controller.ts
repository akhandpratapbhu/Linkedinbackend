// comment.controller.ts
import { Controller, Post, Body, Param, UseGuards, Request, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { CommentService } from 'src/feed/services/comment.service';
import { CommentEntity } from '../modes/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  commentOnPost(@Param('postId') postId: number, @Body('content') content: string, @Request() req) {
    return this.commentService.commentOnPost(req.user.id, postId, content);
  }

  @Get(':postId')
  findAllComments(@Param('postId') postId: number): Observable<CommentEntity[]> {
    return this.commentService.findAllComments(postId);
  }
  
}
