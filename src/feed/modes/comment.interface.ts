import { User } from "src/auth/models/user.interface";
import { FeedPost } from "./post.interface";

export interface Comment{
    id?:number,
    content?:string,
    post?:FeedPost
    user:User
   
}