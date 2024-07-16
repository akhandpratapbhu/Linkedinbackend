// like.controller.ts
import { Controller, Post, Param, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { LikeService } from '../services/like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  likePost(@Param('postId') postId: number, @Request() req) {
    return this.likeService.likePost(req.user.id, postId);
  }
}
