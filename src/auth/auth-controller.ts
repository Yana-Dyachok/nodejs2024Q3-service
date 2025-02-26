import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth-service';
import { CreateUserDto } from 'src/user/dto/create-user';
import { RefreshDto } from './dto/refresh';
import { Public } from 'src/decorators/Public.decorators';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto.login, createUserDto.password);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto.login, createUserDto.password);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshTokenDto: RefreshDto) {
    return this.authService.refresh(refreshTokenDto.refreshToken);
  }
}
