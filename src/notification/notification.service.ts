import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.interface';
import { NotificationEntity } from './notification.entity';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(NotificationEntity)
        private notificationRepository: Repository<NotificationEntity>,
      ) {}
    
      async findAllByUser(userId: string): Promise<Notification[]> {
        return this.notificationRepository.find({ where: { userId,isRead:false }, order: { createdAt: 'DESC' } });
      }
    
      async markAsRead(notificationId: number): Promise<void> {
        await this.notificationRepository.update(notificationId, { isRead: true });
      }
      async postNotification(notification: Notification): Promise<Notification> {
       
        return this.notificationRepository.save(notification);
      }
}
