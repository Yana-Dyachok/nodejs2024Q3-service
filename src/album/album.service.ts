import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { isString, isInt, isUUID } from 'class-validator';
import { CreateAlbumDto } from './dto/create-album';
import { UpdateAlbumDto } from './dto/update-album';
import { Album } from './entities/album.entity';
import { Database } from 'src/db/db';

@Injectable()
export class AlbumService {
  findAll(): Album[] {
    return Database.albums;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = new Album(createAlbumDto);
    this.validateArtistId(newAlbum.artistId);
    Database.albums.push(newAlbum);
    return newAlbum;
  }

  findOne(id: string): Album {
    return this.findAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findAlbumById(id);

    if (updateAlbumDto.name) {
      this.validateString(updateAlbumDto.name, 'Name');
      album.name = updateAlbumDto.name;
    }

    if (updateAlbumDto.year) {
      this.validateInteger(updateAlbumDto.year, 'Year');
      album.year = updateAlbumDto.year;
    }

    if (updateAlbumDto.artistId) {
      this.validateArtistId(updateAlbumDto.artistId);
      album.artistId = updateAlbumDto.artistId;
    }

    return album;
  }

  remove(id: string): void {
    const index = Database.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    Database.albums.splice(index, 1);
  }

  private findAlbumById(id: string): Album {
    const album = Database.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  private validateArtistId(artistId: string | null): void {
    if (artistId && !isUUID(artistId, '4')) {
      throw new BadRequestException(
        `Artist ID ${artistId} must be a valid UUID`,
      );
    }
    if (
      artistId &&
      !Database.artists.find((artist) => artist.id === artistId)
    ) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }
  }

  private validateString(value: string, field: string): void {
    if (!isString(value)) {
      throw new BadRequestException(`${field} must be a string`);
    }
  }

  private validateInteger(value: number, field: string): void {
    if (!isInt(value)) {
      throw new BadRequestException(`${field} must be an integer`);
    }
  }
}
