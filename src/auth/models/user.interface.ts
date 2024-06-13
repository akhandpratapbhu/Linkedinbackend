import { FeedPost } from "src/feed/modes/post.interface";
import { Role } from "./role.enum";

export interface User{
    id?:number,
    username?:string,
    email?:string,
    image?:string,
    backgroundimage?:string,
    phoneNumber?:string,
    password?:string,
    captcha?:string,
    role?:Role,
    posts?:FeedPost[]
}