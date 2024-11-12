import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { Database } from 'src/db/db';

@Injectable()
export class FavoriteService {
  @Inject(ArtistService)
  private artistService: ArtistService;
  @Inject(AlbumService)
  private albumService: AlbumService;
  @Inject(TrackService)
  private trackService: TrackService;

  findAll() {
    return {
      artists: Database.favorites.artists || [],
      albums: Database.favorites.albums || [],
      tracks: Database.favorites.tracks || [],
    };
  }

  addFavoriteArtist(id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    if (Database.favorites.artists.find((fav) => fav.id === artist.id)) {
      throw new InternalServerErrorException('Artist is already in favorites');
    }

    Database.favorites.artists.push(artist);
    return artist;
  }

  addFavoriteAlbum(id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    if (Database.favorites.albums.find((fav) => fav.id === album.id)) {
      throw new InternalServerErrorException('Album is already in favorites');
    }

    Database.favorites.albums.push(album);
    return album;
  }

  addFavoriteTrack(id: string) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    if (Database.favorites.tracks.find((fav) => fav.id === track.id)) {
      throw new InternalServerErrorException('Track is already in favorites');
    }

    Database.favorites.tracks.push(track);
    return track;
  }

  removeFavoriteArtist(id: string) {
    const artistIndex = Database.favorites.artists.findIndex(
      (fav) => fav.id === id,
    );
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }

    Database.favorites.artists.splice(artistIndex, 1);
    return { message: 'Artist removed from favorites' };
  }

  removeFavoriteAlbum(id: string) {
    const albumIndex = Database.favorites.albums.findIndex(
      (fav) => fav.id === id,
    );
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found in favorites');
    }

    Database.favorites.albums.splice(albumIndex, 1);
    return { message: 'Album removed from favorites' };
  }

  removeFavoriteTrack(id: string) {
    const trackIndex = Database.favorites.tracks.findIndex(
      (fav) => fav.id === id,
    );
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found in favorites');
    }

    Database.favorites.tracks.splice(trackIndex, 1);
    return { message: 'Track removed from favorites' };
  }
}
