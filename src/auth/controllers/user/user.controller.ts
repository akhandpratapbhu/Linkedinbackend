import { Controller, Param,Get, Post, UseGuards,Request, UseInterceptors, UploadedFile, HttpException, HttpStatus, Res, NotFoundException, Put, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of, switchMap } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { storage } from 'src/auth/helpers/image-storage';
import { UserService } from 'src/auth/services/user/user.service';
import { Response } from 'express';
import * as path from 'path';
import { friendRequest, friendRequestStatus } from 'src/auth/models/friend-request.interface';
import { User } from 'src/auth/models/user.interface';
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

   @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadImage(@Request() req) {
      try {
        const file = req.file.originalname; // Access the uploaded file from req.file
        const userId = req.user.id; // Assuming you have a user object attached to the request by the JwtAuthGuard
        // Now you can use the user ID and the uploaded file to update the user's profile image
        await this.userService.updateUserImageById(userId, file); // Assuming you have a method in your service to update the user's image
        return { message: 'Image uploaded successfully' ,img:file};
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @UseGuards(JwtGuard)
    @Post('uploadbackgroundimage')
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadbackgroundimage(@Request() req) {
      try {
        const file = req.file.originalname; // Access the uploaded file from req.file
        const userId = req.user.id; // Assuming you have a user object attached to the request by the JwtAuthGuard
        // Now you can use the user ID and the uploaded file to update the user's profile image
        await this.userService.updateUserbackgroundImageById(userId, file); // Assuming you have a method in your service to update the user's image
        return { message: 'Image uploaded successfully' ,img:file};
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Get(':id')
    findUserById(@Param('id') id: number):Observable<User> {
      return this.userService.findUserById(id);
    }
    @Get('search/:username')
    async searchByUsername(@Param('username') username: string): Promise<User[]> {
      return this.userService.searchByUsername(username);
    }

    @UseGuards(JwtGuard)
    @Get('image/:id')
    async findImageUserById(@Param('id') id: number, @Res() res: Response): Promise<any> {
      try {
        const imageName: string = await this.userService.findImgUserById(id);
        res.sendFile(imageName, { root: path.resolve('./uploads') });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error; // Rethrow NotFoundException to handle it globally
        }
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    }
    @UseGuards(JwtGuard)
    @Get('image-name/:id')
    async findImageNameUserById(@Param('id') id: number, @Res() res: Response): Promise<any> {
      try {
        const user= await this.userService.findImgNameUserById(id);
      return   res.send(user);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error; // Rethrow NotFoundException to handle it globally
        }
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    }
    @UseGuards(JwtGuard)
    @Post('friend-request/send/:recieverId')
    sendFriendRequest(@Param('recieverId') recieverId: number,@Request() req):Observable<friendRequest |{error:string}> {
      return this.userService.sendFriendRequest(recieverId,req.user);
    }

    @UseGuards(JwtGuard)
    @Get('friend-request/status/:recieverId')
    getFriendRequestStatus(@Param('recieverId') recieverId: string,@Request() req):Observable<friendRequestStatus> {
      const id=parseInt(recieverId)
      return this.userService.getFriendRequestStatus(id,req.user);
    }

    @UseGuards(JwtGuard)
    @Put('friend-request/response/:friendRequestId')
    responseToFriendRequest(@Param('friendRequestId') friendRequestId: number,@Body() statusResponse:friendRequestStatus):Observable<friendRequestStatus> {
      return this.userService.responseToFriendRequest(friendRequestId,statusResponse.status);
    }

    @UseGuards(JwtGuard)
    @Get('friend-request/me/:recieved-requests')
    getFriendRequestfromRecipients(@Request() req): Observable<friendRequestStatus[]> {

      return this.userService.getFriendRequestfromRecipients(req.user);
    }
    @Get()
    findAllUser(): Observable<User[]> {
        return this.userService.findAllUser();
    }
}
