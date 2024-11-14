import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/types/interfaces';

export class User implements IUser {
  @ApiProperty({ required: true, format: 'uuid' })
  id: string;

  @ApiProperty({
    required: true,
    example: 'CheckUser',
    description: 'User login',
  })
  @IsString()
  @IsNotEmpty({ message: 'Login cannot be empty' })
  login: string;

  @Exclude()
  @ApiProperty({ required: true, description: 'User password' })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @ApiProperty({ required: true, example: 1 })
  version: number;

  @ApiProperty({ required: true, example: Date.now() })
  createdAt: number; 

  @ApiProperty({ required: true, example: Date.now() })
  updatedAt: number; 
}
