import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isBoolean, isString } from 'class-validator';
import { CreateArtistDto } from './dto/create-artist';
import { UpdateArtistDto } from './dto/update-artist';
import { Artist } from './entities/artist.entity';
import { Database } from 'src/db/db';

@Injectable()
export class ArtistService {
  findAll() {
    return Database.artists;
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist(createArtistDto);
    Database.artists.push(newArtist);
    return newArtist;
  }

  findOne(id: string) {
    const artist = Database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(
        `Artist with id ${id} is not found in the database`,
      );
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!updateArtistDto) {
      throw new BadRequestException('Update data is required');
    }

    const { name, grammy } = updateArtistDto;

    if (!isString(name) || !isBoolean(grammy)) {
      throw new BadRequestException('Data types are invalid');
    }

    const currentArtist = Database.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    if (name) {
      currentArtist.name = name;
    }

    if (typeof grammy === 'boolean') {
      currentArtist.grammy = grammy;
    }

    return currentArtist;
  }

  remove(id: string) {
    const currentArtistId = Database.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (currentArtistId === -1) {
      throw new NotFoundException(
        `Artist with id ${id} is not found in the database`,
      );
    }
    Database.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    Database.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    Database.artists.splice(currentArtistId, 1);
  }
}
