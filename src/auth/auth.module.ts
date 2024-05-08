import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles/roles.guard';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports:[ MulterModule.register({
    dest: './uploads', // Destination directory for uploaded files
  }),JwtModule.registerAsync({
   useFactory:()=>({
 secret:process.env.JWT_SECRET,
 signOptions:{expiresIn:'3600s'}
   }) 
  })
    
   , TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService,JwtGuard,JwtStrategy,RolesGuard, UserService],
  controllers: [AuthController, UserController],
  exports:[AuthService,UserService]
})
export class AuthModule {}
