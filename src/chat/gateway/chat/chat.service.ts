import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/user.entity';
import { Message } from 'src/chat/message.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createMessage(message: any): Promise<Message> {
    // Fetch the sender using findOne
    const sender = await this.usersRepository.findOne({ where: { id: message.senderId } });
    if (!sender) {
        throw new Error('Sender not found');
    }

    // Fetch the recipient using findOne
    const recipient = await this.usersRepository.findOne({ where: { id: message.recipientId } });
    if (!recipient) {
        throw new Error('Recipient not found');
    }

    // Create a new message
    const newMessage = this.messagesRepository.create({
        content: message.content,
        sender: sender,
        recipient: recipient,
    });

    // Save the new message to the repository
    return this.messagesRepository.save(newMessage);
}

}
