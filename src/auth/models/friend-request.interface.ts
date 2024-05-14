import { User } from "./user.interface";

export type friendRequest_status='pending'| 'accepted' | 'declined';

export interface friendRequestStatus{
    status?:friendRequest_status,
}
export interface friendRequest{
    id?:number,
    creator?:User,
    reciever?:User,
    status?:friendRequest_status,
}