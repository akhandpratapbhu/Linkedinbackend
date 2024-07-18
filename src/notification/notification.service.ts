import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
      ) {}
    
      async findAllByUser(userId: string): Promise<Notification[]> {
        return this.notificationRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
      }
    
      async markAsRead(notificationId: number): Promise<void> {
        await this.notificationRepository.update(notificationId, { isRead: true });
      }
}
