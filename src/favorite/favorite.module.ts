import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { ArtistsModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TracksModule } from 'src/track/track.module';

@Module({
  imports: [ArtistsModule, AlbumModule, TracksModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
