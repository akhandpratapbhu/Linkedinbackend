import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      
    ) { } 
    
    async findUserById(id: number): Promise<any> {
        const userId = await this.userRepository.find( {where:{ id:id},relations:['feedPosts'] });
        if (!userId) {
          throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return userId;
      }

      updateUserImageById(id:number,image:string){
        const user:User=new UserEntity();
        user.id=id;
        user.image=image;
      return this.userRepository.update(id,user)
      }
      async findImgUserById(id: number): Promise<string> {
        const user = await this.userRepository.findOneById(id);
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user.image // Assuming the user entity has a property "imageName" which holds the name of the image file
      }

}
