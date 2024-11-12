import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ type: String, description: 'Artist name', example: 'Beyonce' })
  @IsString()
  @IsNotEmpty({ message: 'Artist cannot be empty' })
  name: string;

  @ApiProperty({ type: String, description: 'has grammy', example: true })
  @IsNotEmpty({ message: 'Grammy cannot be empty' })
  @IsBoolean()
  grammy: boolean;
}
