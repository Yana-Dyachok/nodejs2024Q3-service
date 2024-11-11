import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track';
import { UpdateTrackDto } from './dto/update-track';
import { Track } from './entities/track.entity';
import { Database } from 'src/db/db';
import {
  validateId,
  findModuleById,
  validateString,
  validateInteger,
} from 'src/utils/validation';

@Injectable()
export class TrackService {
  findAll(): Track[] {
    return Database.tracks;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = new Track(createTrackDto);
    validateId(newTrack.artistId, Database.artists);
    validateId(newTrack.albumId, Database.albums);
    Database.tracks.push(newTrack);
    return newTrack;
  }

  findOne(id: string): Track {
    return findModuleById(id, Database.tracks, 'Track');
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = findModuleById(id, Database.tracks, 'Track');

    if (updateTrackDto.name) {
      validateString(updateTrackDto.name, 'Name');
      track.name = updateTrackDto.name;
    }

    if (updateTrackDto.duration) {
      validateInteger(updateTrackDto.duration, 'Duration');
      track.duration = updateTrackDto.duration;
    }

    if (updateTrackDto.artistId) {
      validateId(updateTrackDto.artistId, Database.artists);
      track.artistId = updateTrackDto.artistId;
    }

    if (updateTrackDto.albumId) {
      validateId(updateTrackDto.albumId, Database.albums);
      track.albumId = updateTrackDto.albumId;
    }

    return track;
  }

  remove(id: string): void {
    const index = Database.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    Database.favorites.tracks.forEach((favorites) => {
      if (favorites.id === id) {
        favorites.id = null;
      }
    });
    Database.tracks.splice(index, 1);
  }
}
