import { UserEntity } from "src/auth/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('feed_post')
export class FeedPostEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:''})
    body:string;
    
    @Column({default:''})
    image:string;
    
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date;

    @ManyToOne(()=>UserEntity,(UserEntity)=>UserEntity.feedPosts)
    author:UserEntity;
}