import { User } from "src/auth/models/user.interface";
import { FeedPost } from "./post.interface";

export interface Like{
    id?:number,
    post?:FeedPost,
    user:User
   
}