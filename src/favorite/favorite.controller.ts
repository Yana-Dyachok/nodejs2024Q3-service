import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOkResponse({ description: 'Favorites retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll() {
    return this.favoriteService.findAll();
  }

  private async addFavoriteEntity(
    type: 'track' | 'album' | 'artist',
    id: string,
    addMethod: (id: string) => Promise<unknown>,
  ) {
    try {
      return await addMethod(id);
    } catch (error) {
      if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Unable to process the entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Artist added to favorites successfully' })
  @ApiBadRequestResponse({ description: 'Invalid artist ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.addFavoriteEntity(
      'artist',
      id,
      this.favoriteService.addFavoriteArtist.bind(this.favoriteService),
    );
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Album added to favorites successfully' })
  @ApiBadRequestResponse({ description: 'Invalid album ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.addFavoriteEntity(
      'album',
      id,
      this.favoriteService.addFavoriteAlbum.bind(this.favoriteService),
    );
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Track added to favorites successfully' })
  @ApiBadRequestResponse({ description: 'Invalid track ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.addFavoriteEntity(
      'track',
      id,
      this.favoriteService.addFavoriteTrack.bind(this.favoriteService),
    );
  }

  private async removeFavoriteEntity(
    type: 'track' | 'album' | 'artist',
    id: string,
    removeMethod: (id: string) => Promise<unknown>,
  ) {
    try {
      return await removeMethod(id);
    } catch (error) {
      if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Unable to process the entity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Artist removed from favorites successfully',
  })
  @ApiNotFoundResponse({ description: 'Artist not found in favorites' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeFavoriteEntity(
      'artist',
      id,
      this.favoriteService.removeFavoriteArtist.bind(this.favoriteService),
    );
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Album removed from favorites successfully',
  })
  @ApiNotFoundResponse({ description: 'Album not found in favorites' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeFavoriteEntity(
      'album',
      id,
      this.favoriteService.removeFavoriteAlbum.bind(this.favoriteService),
    );
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Track removed from favorites successfully',
  })
  @ApiNotFoundResponse({ description: 'Track not found in favorites' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeFavoriteEntity(
      'track',
      id,
      this.favoriteService.removeFavoriteTrack.bind(this.favoriteService),
    );
  }
}
