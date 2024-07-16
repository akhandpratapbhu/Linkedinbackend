// comment.controller.ts
import { Controller, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { CommentService } from 'src/feed/services/comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  commentOnPost(@Param('postId') postId: number, @Body('content') content: string, @Request() req) {
    return this.commentService.commentOnPost(req.user.id, postId, content);
  }
}
