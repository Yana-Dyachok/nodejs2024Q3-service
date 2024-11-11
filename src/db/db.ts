import { IDatabase } from 'src/types/interfaces';

export const Database: IDatabase = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
