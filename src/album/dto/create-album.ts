import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { IAlbum } from 'src/types/interfaces';

export class CreateAlbumDto implements Omit<IAlbum, 'id'> {
  @ApiProperty({
    type: String,
    description: 'Album name',
    example: 'Lemonade',
  })
  @IsString()
  @IsNotEmpty({ message: 'Album name cannot be empty' })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Release year of the album',
    example: 2016,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Year cannot be empty' })
  year: number;

  @ApiProperty({
    type: String,
    description: 'Artist ID associated with the album',
    format: 'uuid',
    nullable: true,
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'Artist ID must be a valid UUID' })
  @IsOptional()
  artistId: string | null;
}
