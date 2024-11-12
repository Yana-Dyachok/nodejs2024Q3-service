import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TracksModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';

dotenv.config();
const port = process.env.PORT;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          PORT_API: parseInt(port, 10) || 4000,
        }),
      ],
    }),
    UserModule,
    ArtistsModule,
    AlbumModule,
    TracksModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
