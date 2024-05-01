import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService:JwtService
    ) { }
    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 12);
        return hashedPassword;
      }
      
      async registerUser(user: User): Promise<User> {
        const hashedPassword = await this.hashPassword(user.password);
        user.password = hashedPassword;
        return this.userRepository.save(user);
      }
      async loginUser(user: User): Promise<string> {
        // Find the user by email or username (assuming you use email for login)
        const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
      
        if (!existingUser) {
          throw new NotFoundException('User not found'); // User with provided email doesn't exist
        }
      
        // Check if the provided password matches the hashed password stored in the database
        const passwordMatches = await this.comparePasswords(user.password, existingUser.password);
      
        if (!passwordMatches) {
          throw new UnauthorizedException('Invalid credentials'); // Password doesn't match
        }
      
        // Login successful, return the user object
        return this.jwtService.signAsync({existingUser});
      }
      
      async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        // Compare the provided plain password with the hashed password using bcrypt
        return bcrypt.compare(plainPassword, hashedPassword);
      }
      
}