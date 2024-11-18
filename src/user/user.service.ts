import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { User } from './entities/user.entity';
import { Database } from 'src/db/db';

@Injectable()
export class UserService {
  findAll() {
    return Database.users;
  }

  findOne(id: string) {
    const user = Database.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(
        `User with id ${id} is not found in the database`,
      );
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    Database.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = Database.users.find((user) => user.id === id);
    if (!currentUser) {
      throw new NotFoundException(
        `User with id ${id} is not found in the database`,
      );
    }

    this.isOldPasswordMatch(currentUser, updateUserDto.oldPassword);
    currentUser.password = updateUserDto.newPassword;
    currentUser.version += 1;
    currentUser.updatedAt = new Date().getTime();
    return currentUser;
  }

  isOldPasswordMatch(user: User, oldPassword: string) {
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }
  }

  remove(id: string) {
    const currentUserId = Database.users.findIndex((user) => user.id === id);
    if (currentUserId === -1) {
      throw new NotFoundException(
        `User with id ${id} is not found in the database`,
      );
    }
    Database.users.splice(currentUserId, 1);
  }
}
