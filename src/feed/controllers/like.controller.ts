// like.controller.ts
import { Controller, Post, Param, UseGuards, Request, Get } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { LikeService } from '../services/like.service';
import { Observable } from 'rxjs';
import { Like } from '../modes/like.interface';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtGuard)
  @Post(':postId')
  likePost(@Param('postId') postId: number, @Request() req) {
    return this.likeService.likePost(req.user.id, postId);
  }
  @Get(':postId')
  findAllLikes(@Param('postId') postId: number) {
    return this.likeService.findAllLikes(postId);
  }
}
