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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track';
import { UpdateTrackDto } from './dto/update-track';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async listAllTracks() {
    return this.trackService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (
      !updateTrackDto ||
      (updateTrackDto.name && typeof updateTrackDto.name !== 'string') ||
      (updateTrackDto.duration && !Number.isInteger(updateTrackDto.duration)) ||
      (updateTrackDto.artistId &&
        typeof updateTrackDto.artistId !== 'string') ||
      (updateTrackDto.albumId && typeof updateTrackDto.albumId !== 'string')
    ) {
      throw new BadRequestException('Invalid data types for track update');
    }
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.trackService.remove(id);
  }
}
