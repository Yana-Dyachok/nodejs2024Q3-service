import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserDto } from 'src/types/interfaces';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User login',
    example: 'Yana123',
  })
  @IsString()
  @IsNotEmpty({ message: 'Login cannot be empty' })
  login: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'somePassword123',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
