import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User, googleUser } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';
import axios from 'axios';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    register(@Body() user: User) {
        return this.authService.registerUser(user)
    }
    @Post('/login')
    async login(@Body() user: User) {
        const captchaToken = user.captcha;
        const secretKey = '6LfZJs4pAAAAAKZd8wUHRWeBfaTrZrlu-nwnkDUb'; // Replace with your reCAPTCHA secret key
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

        try {
            // const response = await axios.post(verifyUrl);
            //   if (response.data && response.data.success) {
            // reCAPTCHA verification successful
            //return 'reCAPTCHA verification successful'
            return this.authService.loginUser(user)
            // }
            //  else {
            // reCAPTCHA verification failed
            // //    throw new Error('reCAPTCHA verification failed');
            // }
        } catch (error) {
            // Error occurred during reCAPTCHA verification
            throw new Error('Failed to verify reCAPTCHA');
        }
    }
    @Post('/loginWithGoogle')
    loginWithGoogle(@Body() user: User) {
        try {

            return this.authService.loginWithGoogleUser(user)

        } catch (error) {
            throw new Error('Failed to verify reCAPTCHA');
        }
    }
    @Get(':id')
    findUserById(@Param('id') id: number): Promise<any> {
        return this.authService.findUserById(id);
    }
}
