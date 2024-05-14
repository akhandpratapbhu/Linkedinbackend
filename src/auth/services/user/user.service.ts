import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Observable, from, of, switchMap, pipe, map } from 'rxjs';
import { FriendRequestEntity } from 'src/auth/models/friend-request.entity';
import { friendRequest, friendRequestStatus, friendRequest_status } from 'src/auth/models/friend-request.interface';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FriendRequestEntity)
    private readonly friendRequestRepository: Repository<FriendRequestEntity>,
  ) { }

  //  findUserById(id: number):Observable<User> {
  //     const userId =  this.userRepository.find( {where:{ id:id},relations:['feedPosts'] });
  //     if (!userId) {
  //       throw new NotFoundException(`Post with ID ${id} not found`);
  //     }
  //     return of(userId);
  //   }
  findUserById(id: number): Observable<User> {
    return from(this.userRepository.findOne({ where: { id: id }, relations: ['feedPosts'] })).pipe(
      switchMap((user: UserEntity | undefined) => {
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return of(user as User); // Cast UserEntity to User
      })
    );
  }
  updateUserImageById(id: number, image: string) {
    const user: User = new UserEntity();
    user.id = id;
    user.image = image;
    return this.userRepository.update(id, user)
  }
  async findImgUserById(id: number): Promise<string> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user.image // Assuming the user entity has a property "imageName" which holds the name of the image file
  }
  async findImgNameUserById(id: number): Promise<object> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user // Assuming the user entity has a property "imageName" which holds the name of the image file
  }
  // hasRequestBeenSentOrRecieved(creator: User, reciever: User): Observable<boolean> {
  //   return from(this.friendRequestRepository.find({
  //     where: [
  //       { creator, reciever },
  //       { creator: reciever, reciever: creator },
  //     ],
  //   }),
  //   ).pipe(
  //     switchMap((friendRequest:friendRequest) => {
  //       if (!friendRequest) return of(false);
  //       return of(true);
  //     })
  //   )
  // }
  hasRequestBeenSentOrReceived(creator: User, reciever: User): Observable<boolean> {
    return from(
      this.friendRequestRepository.count({
        where: [
          { creator, reciever },
          { creator: reciever, reciever: creator },
        ],
      }),
    ).pipe(
      map((count: number) => count > 0),
    );
  }
  sendFriendRequest(recieverId: number, user: User): Observable<friendRequest | { error: string }> {
    let creator: User = new UserEntity();
    creator.email = user.email;
    creator.id = user.id;
    creator.role = user.role
    creator.username = user.username
    if (recieverId == creator.id) return of({ error: 'it is not possible to add YourSelf!' });
    return this.findUserById(recieverId).pipe(
      switchMap((reciever: User) => {
        return this.hasRequestBeenSentOrReceived(creator, reciever).pipe(
          switchMap((hasRequestBeenSentOrRecieved: boolean) => {
            if (hasRequestBeenSentOrRecieved) return of({ error: 'A friend request has already been sent of recieved to your account !' })
            let friendRequest: friendRequest = {
              creator,
              reciever,
              status: 'pending'
            }
            return from(this.friendRequestRepository.save(friendRequest))
          })
        );
      })
    )
  }
  getFriendRequestStatus(recieveId: number, user: User): Observable<any> {
    let creator: User = new UserEntity();
    creator.email = user.email;
    creator.id = user.id;
    creator.role = user.role
    creator.username = user.username

    return this.findUserById(recieveId).pipe(
      switchMap((reciever: UserEntity) => {
        return this.friendRequestRepository.findOne({
          where: {
            creator,
            reciever,
          },
        });
      }),
      switchMap((friendRequest: FriendRequestEntity | undefined) => {
        if (!friendRequest) {
          return of({ status: 'Not requested' }); // Or handle accordingly
        }
        return of({ status: friendRequest.status });
      }),
    );
  }
  getFriendRequestUserById(friendRequestId: number): Observable<friendRequest> {
    return from(this.friendRequestRepository.findOne({
      where: [{ id: friendRequestId }]
    }))
  }
  responseToFriendRequest(friendRequestId: number, statusResponse: friendRequest_status): Observable<friendRequestStatus> {
    return this.getFriendRequestUserById(friendRequestId).pipe(
      switchMap((friendRequest: friendRequest) => {
        return from(this.friendRequestRepository.save({
          ...friendRequest,
          status: statusResponse
        }))
      })
    )
  }
  getFriendRequestfromRecipients(user:User): Observable<friendRequest[]> {
    let currentUser: User = new UserEntity();
    currentUser.email = user.email;
    currentUser.id = user.id;
    currentUser.role = user.role
    currentUser.username = user.username
    return from(this.friendRequestRepository.find({
      where: [{ reciever: currentUser }],
    }),
  );
  }

}
