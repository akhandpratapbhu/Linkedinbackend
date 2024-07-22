import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { Notification } from './notification.interface';

@Controller('notification')
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  async getNotifications(@Param('userId') userId: string) {
    return this.notificationService.findAllByUser(userId);
  }
  
 
  @Post('')
  register(@Body() notification: Notification) {
    return this.notificationService.postNotification(notification)
}
  @Patch(':id/read')
  async markAsRead(@Param('id') id: number) {
    return this.notificationService.markAsRead(id);
  }
}
