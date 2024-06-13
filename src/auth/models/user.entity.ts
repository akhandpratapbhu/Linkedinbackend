import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { FeedPostEntity } from "src/feed/modes/post.entity";
import { FriendRequestEntity } from "./friend-request.entity";
import { Message } from "src/chat/message.entity"; 

@Entity('user')
export class UserEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;
    
    @Column({unique:true})
    email:string;
    
    @Column({nullable:true})
    image:string;
    
    @Column({nullable:true})
    backgroundimage:string;

    @Column()
    phoneNumber:string;

    @Column()
    password:string;

    @Column({default:Role.User})
    role:Role;

    @OneToMany(()=>FeedPostEntity,(FeedPostEntity)=>FeedPostEntity.author)
    feedPosts:FeedPostEntity[]

    @OneToMany(()=>FriendRequestEntity,(FriendRequestEntity)=>FriendRequestEntity.creator)
    sentFriendRequests:FriendRequestEntity[]

    @OneToMany(()=>FriendRequestEntity,(FriendRequestEntity)=>FriendRequestEntity.reciever)
    recieveFriendRequests:FriendRequestEntity[]

    @OneToMany(() => Message, (message) => message.sender)
    messages: Message[];

    @OneToMany(() => Message, (message) => message.recipient)
    receivedMessages: Message[];
}