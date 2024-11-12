import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ModuleType } from 'src/types/type';
import { isString, isUUID, isInt } from 'class-validator';

export const findModuleById = <T extends ModuleType>(
  id: string,
  dataBase: Array<T>,
  moduleName: string,
): T => {
  const item = dataBase.find((item) => item.id === id);
  if (!item) {
    throw new NotFoundException(`${moduleName} with ID ${id} not found`);
  }
  return item;
};

export const validateId = (
  id: string | null,
  dataBase: Array<{ id: string }>,
): void => {
  if (id && !isUUID(id, '4')) {
    throw new BadRequestException(`ID ${id} must be a valid UUID`);
  }
  if (id && !dataBase.find((item) => item.id === id)) {
    throw new NotFoundException(`ID ${id} not found`);
  }
};

export const validateString = (value: string, field: string): void => {
  if (!isString(value)) {
    throw new BadRequestException(`${field} must be a string`);
  }
};

export const validateInteger = (value: number, field: string): void => {
  if (!isInt(value)) {
    throw new BadRequestException(`${field} must be an integer`);
  }
};
