import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TracksModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { PrismaModule } from 'prisma/prisma.module';
import { LoggingService } from './logging/logging.service';
import { LoggingMiddleware } from './logging/logging-middleware';
import { AuthModule } from './auth/auth-module';
import { AuthGuard } from './auth/auth-guard';
import { DatabaseModule } from './db/db-module';
import { APP_GUARD } from '@nestjs/core';

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
    AuthModule,
    UserModule,
    ArtistsModule,
    AlbumModule,
    TracksModule,
    FavoriteModule,
    PrismaModule,
  ],
  providers: [
    LoggingService,
    DatabaseModule,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [LoggingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
