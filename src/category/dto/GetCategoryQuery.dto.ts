import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsNumberString,
  IsString,
  IsBoolean,
  IsNumber,
  IsIn,
} from 'class-validator';

export enum CategorySortField {
  TITLE = 'title',
  TIME = 'time',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetCategoryQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  time?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    enum: ['title', 'time', 'createdAt'],
    example: 'createdAt',
  })
  @IsOptional()
  @IsIn(['title', 'time', 'createdAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], example: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
