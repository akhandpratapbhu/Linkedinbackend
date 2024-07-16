import { UserEntity } from "src/auth/models/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LikeEntity } from "./like.entity";
import { CommentEntity } from "./comment.entity";

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
    user:UserEntity;
    @OneToMany(() => LikeEntity, (like) => like.post)
    like: LikeEntity[];
  
    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comment: CommentEntity[];
}