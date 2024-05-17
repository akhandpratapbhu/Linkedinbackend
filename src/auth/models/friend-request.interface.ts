import { User } from "./user.interface";

export type friendRequest_status='not-sent'|'pending'| 'accepted' | 'declined'|'waiting-for-current-user-response';

export interface friendRequestStatus{
    status?:friendRequest_status,
}
export interface friendRequest{
    id?:number,
    creator?:User,
    reciever?:User,
    status?:friendRequest_status,
}