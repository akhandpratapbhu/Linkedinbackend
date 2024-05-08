import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { FeedPostEntity } from "src/feed/modes/post.entity";

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
    @Column()
    phoneNumber:string;

    @Column()
    password:string;

    @Column({default:Role.User})
    role:Role;

    @OneToMany(()=>FeedPostEntity,(FeedPostEntity)=>FeedPostEntity.author)
    feedPosts:FeedPostEntity[]
}