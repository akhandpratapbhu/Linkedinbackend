import { User } from "src/auth/models/user.interface";
import { Like } from "./like.interface";

export interface FeedPost{
    id?:number,
    body?:string,
    image?:string,
    createdAt?:Date,
    user?:User,
    // like?:Like,
    // comment?:Comment
}