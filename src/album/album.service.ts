import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album';
import { UpdateAlbumDto } from './dto/update-album';
import { Album } from './entities/album.entity';
import { Database } from 'src/db/db';
import {
  validateId,
  findModuleById,
  validateString,
  validateInteger,
} from 'src/utils/validation';

@Injectable()
export class AlbumService {
  findAll(): Album[] {
    return Database.albums;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = new Album(createAlbumDto);
    validateId(newAlbum.artistId, Database.artists);
    Database.albums.push(newAlbum);
    return newAlbum;
  }

  findOne(id: string): Album {
    return findModuleById(id, Database.albums, 'Album');
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = findModuleById(id, Database.albums, 'Album');

    if (updateAlbumDto.name) {
      validateString(updateAlbumDto.name, 'Name');
      album.name = updateAlbumDto.name;
    }

    if (updateAlbumDto.year) {
      validateInteger(updateAlbumDto.year, 'Year');
      album.year = updateAlbumDto.year;
    }

    if (updateAlbumDto.artistId) {
      validateId(updateAlbumDto.artistId, Database.artists);
      album.artistId = updateAlbumDto.artistId;
    }

    return album;
  }

  remove(id: string): void {
    const index = Database.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    Database.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    Database.favorites.albums.forEach((favorites) => {
      if (favorites.id === id) {
        favorites.id = null;
      }
    });
    Database.albums.splice(index, 1);
  }
}
