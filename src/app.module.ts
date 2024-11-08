import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumModule } from './album/album.module';
import { TracksModule } from './track/tracks.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
