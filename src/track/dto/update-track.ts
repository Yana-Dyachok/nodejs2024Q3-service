import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsInt,
} from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({
    type: String,
    description: 'Track name',
    example: 'All Night',
  })
  @IsString()
  @IsNotEmpty({ message: 'Track name cannot be empty' })
  name: string;

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

  @ApiProperty({
    type: String,
    description: 'Album ID associated with the album',
    format: 'uuid',
    nullable: true,
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174e324',
  })
  @IsUUID('4', { message: 'Album ID must be a valid UUID' })
  @IsOptional()
  albumId: string | null;

  @ApiProperty({
    type: Number,
    description: 'Duration of the track in seconds',
    example: 201,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Duration cannot be empty' })
  duration: number;
}
