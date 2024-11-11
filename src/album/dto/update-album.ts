import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator';
import { CreateAlbumDto } from './create-album';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({
    type: String,
    description: 'Album name',
    example: 'Lemonade',
    required: true,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Release year of the album',
    example: 2016,
    required: true,
  })
  @IsInt()
  @IsOptional()
  year: number;

  @ApiProperty({
    type: String,
    description: 'Artist ID associated with the album',
    format: 'uuid',
    nullable: true,
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'Artist ID must be a valid UUID' })
  @IsOptional()
  artistId: string | null;
}
