import { FeedPost } from "src/feed/modes/post.interface";
import { Role } from "./role.enum";

export interface User{
    id?:number,
    username?:string,
    email?:string,
    phoneNumber?:string,
    password?:string,
    role?:Role,
    posts?:FeedPost[]
}