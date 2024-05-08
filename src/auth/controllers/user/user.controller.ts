import { Controller, Param,Get, Post, UseGuards,Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { storage } from 'src/auth/helpers/image-storage';
import { UserService } from 'src/auth/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

   @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file,@Request()req) {
    // File is uploaded and available in 'file' variable
    // Now you can store the file in the database
    //{ message: 'File uploaded successfully' };
    console.log("file",file);
    const userId=req.user.id;
    return this.userService.updateUserImageById(userId,file.name)
  }

    @Get(':id')
    findUserById(@Param('id') id: number): Promise<any> {
      return this.userService.findUserById(id);
    }
}
