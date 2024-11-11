import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAlbumDto } from './dto/create-album';
import { UpdateAlbumDto } from './dto/update-album';
import { AlbumService } from './album.service';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async listAllAlbums() {
    return this.albumService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (
      !updateAlbumDto ||
      (updateAlbumDto.name && typeof updateAlbumDto.name !== 'string') ||
      (updateAlbumDto.year && !Number.isInteger(updateAlbumDto.year)) ||
      (updateAlbumDto.artistId && typeof updateAlbumDto.artistId !== 'string')
    ) {
      throw new BadRequestException('Invalid data types for album update');
    }
    const updatedAlbum = await this.albumService.update(id, updateAlbumDto);
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.albumService.remove(id);
  }
}
