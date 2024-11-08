import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { IArtist } from 'src/types/interfaces/interfaces';

export class CreateArtistDto implements Omit<IArtist, 'id'> {
  @ApiProperty({ type: String, description: 'Artist name', example: 'Beyonce' })
  @IsString()
  @IsNotEmpty({ message: 'Artist cannot be empty' })
  name: string;

  @ApiProperty({ type: String, description: 'Has grammy', example: true })
  @IsNotEmpty({ message: 'Grammy cannot be empty' })
  @IsBoolean()
  grammy: boolean;
}
