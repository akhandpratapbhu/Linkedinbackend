import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, map, switchMap } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { FeedPost } from 'src/feed/modes/post.interface';
import { FeedService } from 'src/feed/services/feed/feed.service';
import { from } from 'rxjs';
import { UserService } from 'src/auth/services/user/user.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {

  constructor(private userService: UserService, private feedService: FeedService) { }
  // async canActivate(
  //   context: ExecutionContext,
  // ): Promise<boolean | Promise<boolean> | Observable<boolean>> {
  //   const request = context.switchToHttp().getRequest();
  //   const {user,params}:{user:User,params:{id:number}}=request;
  //   if(!user ||!params) return false;
  //   if(user.role==='admin') return true; //allow admin to get make requests
  //   const userId=user.id;
  //   const feedId=params.id

  //   //Determine if logged-In user is the same as the user that created the feed post
  //  const  fid= this.feedService.findPostById(feedId)
  //  const uid=this.authService.findUserById(userId)
  //  if(await fid===uid){
  //   return true;
  //  }
  //   // return from(this.authService.findUserById(userId)).pipe(
  //   //   switchMap((user: User) =>
  //   //     from(this.feedService.findPostById(1)).pipe(
  //   //       map((feedPost: any) => {
  //   //         console.log(feedPost);

  //   //         let isAuthor = user.id === feedPost.author.id;
  //   //         return isAuthor;
  //   //       })
  //   //     )
  //   //   )
  //   // );
  //   }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User, params: { id: number } } = request;

    if (!user || !params) return false;

    if (user.role === 'admin') return true; // Allow admin to make requests

    const userId = user.id;
    const feedId = params.id;

    // Determine if logged-in user is the same as the user that created the feed post
    const fid = await this.feedService.findPostById(feedId,);
    const uid = await this.userService.findUserById(userId);

    const feedPost = fid;
    const firstFeedPostAuthorId = feedPost[0].author.id;

    //  console.log(feedPost,firstFeedPostAuthorId);
    // Check if the feed post and user exist
    if (!fid || !uid) return false;

    // Check if the user is the author of the feed post
    return firstFeedPostAuthorId === uid.id;
  }

}
