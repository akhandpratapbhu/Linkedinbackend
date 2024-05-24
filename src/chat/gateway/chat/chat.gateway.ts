
// import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway()
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

//     @WebSocketServer() server: Server;

//     handleConnection(socket: Socket) {
//         console.log('Client connected: ' + socket.id);
//     }

//     handleDisconnect(socket: Socket) {
//         console.log('Client disconnected: ' + socket.id);
//     }

//     @SubscribeMessage('join')
//     handleJoin(client: Socket, data: { room: string }) {
//         client.join(data.room);
//         client.broadcast.to(data.room).emit('user joined');
//     }

//     @SubscribeMessage('message')
//     handleMessage(client: Socket, data: { room: string, user: string, message: string }) {
//         this.server.to(data.room).emit('new message', { user: data.user, message: data.message });
//     }
// }


import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { ChatService } from './chat.service';
  import { Socket } from 'socket.io';
import { Server } from 'http';
  
  @WebSocketGateway()
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}
  
    @WebSocketServer()
    server:Server

    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket): Promise<void> {
     
      
      const savedMessage = await this.chatService.createMessage(message);
      console.log(savedMessage);
      this.server.emit('receiveMessage',message)
      //client.to(message.recipientId).emit('receiveMessage', savedMessage);
    }
  
    afterInit(server: any) {
      console.log('Init');
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
    }
  }
  