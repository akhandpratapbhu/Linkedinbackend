

export interface Notification{
    id?:number,
    userId?:string,
    postId?:string,
    message?:string,
    isRead:boolean,
    createdAt: Date
}