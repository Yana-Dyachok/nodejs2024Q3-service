import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsInt,
} from 'class-validator';
import { ITrack } from 'src/types/interfaces/interfaces';

export class CreateTrackDto implements Omit<ITrack, 'id'> {
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
    example: '80d6fa16-9987-4c69-9198-d1bd4aed220f',
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
    example: '"878dafe8-806f-49e4-99c7-233214f4150c',
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
