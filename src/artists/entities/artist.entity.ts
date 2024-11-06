import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { IArtist } from 'src/types/interfaces/interfaces';

export class Artist implements IArtist {
  @ApiProperty({ required: true, format: 'id' })
  id: string;

  @ApiProperty({ required: true, example: 'Beyonce' })
  @IsString()
  @IsNotEmpty({ message: 'Artist cannot be empty' })
  name: string;

  @ApiProperty({ required: false, example: false })
  @IsNotEmpty({ message: 'Grammy cannot be empty' })
  @IsBoolean()
  grammy: boolean;

  constructor(artist: Partial<Artist>) {
    this.id = uuid();
    this.name = artist.name;
    this.grammy = artist.grammy;
  }
}
