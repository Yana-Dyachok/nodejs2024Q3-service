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
import { PrismaModule } from 'prisma/prisma.module';
import { LoggingService } from './logging/logging.service';

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
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingService],
  exports: [LoggingService],
})
export class AppModule {}
