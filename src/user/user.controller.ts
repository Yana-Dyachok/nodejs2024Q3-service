import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async listAllUsers() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async modifyUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
