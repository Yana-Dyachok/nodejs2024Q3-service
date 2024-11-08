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
import { CreateArtistDto } from './dto/create-artist';
import { UpdateArtistDto } from './dto/update-artist';
import { ArtistService } from './artists.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async listAllArtists() {
    return this.artistService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async registerArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async modifyArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (
      !updateArtistDto ||
      typeof updateArtistDto.name !== 'string' ||
      typeof updateArtistDto.grammy !== 'boolean'
    ) {
      throw new BadRequestException('Data types are invalid');
    }
    const updatedArtist = await this.artistService.update(id, updateArtistDto);
    if (!updatedArtist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.artistService.remove(id);
  }
}
