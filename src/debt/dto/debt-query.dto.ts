import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentType, type } from 'src/enums/enums';

export class QueryDebtDto {
  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  contractId?: number;

  @ApiPropertyOptional({ example: '3 Oy to`lovi' })
  @IsOptional()
  @IsString()
  total?: string;

  @ApiPropertyOptional({ example: 'uuid()' })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    enum: ['contractId', 'total', 'time', 'createdAt'],
    example: 'createdAt',
  })
  @IsOptional()
  @IsIn(['contractId', 'total', 'time', 'createdAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], example: 'asc' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
