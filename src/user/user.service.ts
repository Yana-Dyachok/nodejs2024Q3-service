import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { PrismaService } from '../../prisma/prisma';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found in the database`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} is not found in the database`);
    }

    this.isOldPasswordMatch(currentUser, updateUserDto.oldPassword);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: currentUser.version + 1,
        updatedAt: new Date(),
      },
    });
    return updatedUser;
  }

  isOldPasswordMatch(user: PrismaUser, oldPassword: string) {
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }
  }

  async remove(id: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} is not found in the database`);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
