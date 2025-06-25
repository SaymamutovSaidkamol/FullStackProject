import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsBooleanString,
  IsNumberString,
  IsString,
} from 'class-validator';

export enum CategorySortField {
  TITLE = 'title',
  TIME = 'time',
//   CREATED_AT = 'createdAt',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetCategoryQueryDto {
  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @ApiPropertyOptional({ example: 'Phones' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ enum: CategorySortField, example: CategorySortField.TITLE })
  @IsOptional()
  @IsEnum(CategorySortField)
  sortField?: CategorySortField;

  @ApiPropertyOptional({ enum: SortOrder, example: SortOrder.ASC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @ApiPropertyOptional({ example: '12' })
  @IsOptional()
  @IsNumberString()
  time?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: '10' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}

