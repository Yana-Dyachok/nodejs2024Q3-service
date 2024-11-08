import { User } from 'src/user/entities/user.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export interface IDatabase {
  users: User[];
  artists: Artist[];
  albums: Album[];
}
