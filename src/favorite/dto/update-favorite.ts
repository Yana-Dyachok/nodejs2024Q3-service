import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}
