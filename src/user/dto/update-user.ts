import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user';
import { IUpdatePasswordDto } from 'src/types/interfaces';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements IUpdatePasswordDto
{
  @ApiProperty({
    type: String,
    description: 'Old password',
  })
  @IsString()
  @IsNotEmpty({ message: 'Old password cannot be empty' })
  oldPassword: string;

  @ApiProperty({
    type: String,
    description: 'New password',
  })
  @IsString()
  @IsNotEmpty({ message: 'New password cannot be empty' })
  newPassword: string;
}
