import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      findImageNameById(id:number){  
      return this.userRepository.findOneById(id)
      }
}
