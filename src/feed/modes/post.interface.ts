import { User } from "src/auth/models/user.interface";
import { Like } from "./like.interface";

export interface FeedPost{
    id?:number,
    body?:string,
    image?:string,
    createdAt?:Date,
    likes?:string,
    comments?:string
    user?:User,
   
}