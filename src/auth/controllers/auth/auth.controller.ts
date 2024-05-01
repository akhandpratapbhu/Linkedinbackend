import { Body, Controller, Post } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    register(@Body() user:User){
    return this.authService.registerUser(user)
    }
    @Post('/login')
    login(@Body() user:User){
    return this.authService.loginUser(user)
    }
}
