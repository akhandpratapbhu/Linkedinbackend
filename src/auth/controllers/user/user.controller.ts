import { Controller, Param,Get, Post, UseGuards,Request, UseInterceptors, UploadedFile, HttpException, HttpStatus, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of, switchMap } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { storage } from 'src/auth/helpers/image-storage';
import { UserService } from 'src/auth/services/user/user.service';
import { Response } from 'express';
import * as path from 'path';
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
        return { message: 'Image uploaded successfully' };
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get(':id')
    findUserById(@Param('id') id: number): Promise<any> {
      return this.userService.findUserById(id);
    }


   // @UseGuards(JwtGuard)
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
}