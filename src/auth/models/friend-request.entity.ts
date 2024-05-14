import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { friendRequest_status } from "./friend-request.interface";

@Entity('requests')
export class FriendRequestEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>UserEntity,(UserEntity)=>UserEntity.sentFriendRequests)
    creator:UserEntity;
    
    @ManyToOne(()=>UserEntity,(UserEntity)=>UserEntity.recieveFriendRequests)
    reciever:UserEntity;
    @Column()
    status?:friendRequest_status;
}