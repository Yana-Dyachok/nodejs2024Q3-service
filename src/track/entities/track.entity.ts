import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { ITrack } from 'src/types/interfaces/interfaces';

export class Track implements ITrack {
  @ApiProperty({
    required: true,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'ID must be a valid UUID' })
  id: string;

  @ApiProperty({
    required: true,
    description: 'Track name',
    example: 'All Night',
  })
  @IsString()
  @IsNotEmpty({ message: 'Track name cannot be empty' })
  name: string;
  @ApiProperty({
    required: false,
    nullable: true,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174565',
  })
  @IsUUID('4', { message: 'Artist ID must be a valid UUID' })
  @IsOptional()
  artistId: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174567',
  })
  @IsUUID('4', { message: 'Album ID must be a valid UUID' })
  @IsOptional()
  albumId: string | null;

  @ApiProperty({
    required: true,
    description: 'Duration of the track in seconds',
    example: 201,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Duration cannot be empty' })
  duration: number;

  constructor(track: Partial<ITrack>) {
    this.id = uuid();
    this.name = track.name;
    this.artistId = track.artistId;
    this.albumId = track.albumId;
    this.duration = track.duration;
  }
}
