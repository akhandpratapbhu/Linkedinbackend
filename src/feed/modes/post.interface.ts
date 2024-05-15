import { User } from "src/auth/models/user.interface";

export interface FeedPost{
    id?:number,
    body?:string,
    image?:string,
    createdAt?:Date,
    author:User
}