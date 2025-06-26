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

export class QueryPaymentnDto {
  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ example: '3 Oy to`lovi' })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ example: 'uuid()' })
  @IsOptional()
  @IsString()
  partnerId?: string;

  @ApiPropertyOptional({ example: 'uuid()   ' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ enum: PaymentType, example: PaymentType.CASH })
  @IsOptional()
  @IsEnum(PaymentType)
  paymentType?: PaymentType;

  @ApiPropertyOptional({ enum: type, example: type.IN })
  @IsOptional()
  @IsEnum(type)
  type?: type;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    enum: ['amount', 'comment', 'partnerId', 'userId','createdAt'],
    example: 'createdAt',
  })
  @IsOptional()
  @IsIn(['amount', 'comment', 'partnerId', 'userId', 'createdAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], example: 'asc' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
