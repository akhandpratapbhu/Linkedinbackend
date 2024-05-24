import { UserEntity } from 'src/auth/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.messages)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.receivedMessages)
  recipient: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
