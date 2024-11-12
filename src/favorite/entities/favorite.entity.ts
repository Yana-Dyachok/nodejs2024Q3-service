import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorite {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
