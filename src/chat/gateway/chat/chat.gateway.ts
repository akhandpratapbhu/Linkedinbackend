

// import {
//     WebSocketGateway,
//     SubscribeMessage,
//     MessageBody,
//     ConnectedSocket,
//     OnGatewayInit,
//     OnGatewayConnection,
//     OnGatewayDisconnect,
//     WebSocketServer,
//   } from '@nestjs/websockets';
//   import { ChatService } from './chat.service';
//   import { Socket } from 'socket.io';
// import { Server } from 'http';
  
//   @WebSocketGateway()
//   export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//     constructor(private readonly chatService: ChatService) {}
  
//     @WebSocketServer()
//     server:Server

//     @SubscribeMessage('sendMessage')
//     async handleMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket): Promise<void> {
     
      
//       const savedMessage = await this.chatService.createMessage(message);
//       console.log(savedMessage);
//       this.server.emit('receiveMessage',savedMessage)
//       //client.to(message.recipientId).emit('receiveMessage', savedMessage);
//     }
  
//     afterInit(server: any) {
//       console.log('Init');
//     }
  
//     handleDisconnect(client: Socket) {
//       console.log(`Client disconnected: ${client.id}`);
//     }
  
//     handleConnection(client: Socket, ...args: any[]) {
//       console.log(`Client connected: ${client.id}`);
//     }
//   }
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('a user connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('user disconnected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.roomId);
    console.log(`User joined room: ${data.roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { roomId: string; message: any }, @ConnectedSocket() client: Socket) {
    this.server.to(data.roomId).emit('message', data.message);
  //  console.log(`Message sent to room ${data.roomId}: ${data.message}`);
    const savedMessage = await this.chatService.createMessage(data.roomId,data.message);
          console.log(savedMessage);
         // this.server.emit('message',savedMessage)
        //  client.to(data.message.recipientId).emit('message', savedMessage);
  }
  
}
