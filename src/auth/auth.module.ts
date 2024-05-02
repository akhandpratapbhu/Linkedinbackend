import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports:[JwtModule.registerAsync({
   useFactory:()=>({
 secret:process.env.JWT_SECRET,
 signOptions:{expiresIn:'3600s'}
   }) 
  })
    
   , TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService,JwtGuard,JwtStrategy,RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {}
