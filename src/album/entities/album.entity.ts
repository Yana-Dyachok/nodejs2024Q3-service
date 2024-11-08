import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { IAlbum } from 'src/types/interfaces/interfaces';

export class Album implements IAlbum {
  @ApiProperty({
    required: true,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'ID must be a valid UUID' })
  id: string;

  @ApiProperty({
    required: true,
    description: 'Album name',
    example: 'Lemonade',
  })
  @IsString()
  @IsNotEmpty({ message: 'Album name cannot be empty' })
  name: string;

  @ApiProperty({ required: true, description: 'Release year', example: 2016 })
  @IsInt()
  @IsNotEmpty({ message: 'Year cannot be empty' })
  year: number;

  @ApiProperty({
    required: false,
    nullable: true,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174565',
  })
  @IsUUID('4', { message: 'Artist ID must be a valid UUID' })
  @IsOptional()
  artistId: string | null;

  constructor(album: Partial<IAlbum>) {
    this.id = uuid();
    this.name = album.name;
    this.year = album.year;
    this.artistId = album.artistId;
  }
}
