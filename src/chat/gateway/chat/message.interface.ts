import { User } from "src/auth/models/user.interface"

export interface Message{
    id?:number,
    roomId?:string,
    content?:string,
    sender?:User
    recipient?:User, 
}