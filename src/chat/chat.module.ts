


// import { Module } from '@nestjs/common';
// import { ChatGateway } from './gateway/chat/chat.gateway';

// @Module({
//     providers: [ChatGateway],
// })
// export class ChatModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; import { ChatGateway } from './gateway/chat/chat.gateway';

import { UserEntity } from 'src/auth/models/user.entity';
import { Message } from './message.entity';
import { ChatService } from './gateway/chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, UserEntity])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
