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
import { RolePartners } from 'src/enums/enums';

export class QueryPartnerDto {
  @ApiPropertyOptional({ example: 'Saidkamol' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @Type(() => Number)
  balance?: number;

  @ApiPropertyOptional({ enum: RolePartners, example: RolePartners.CURTOMER })
  @IsOptional()
  @IsEnum(RolePartners)
  role?: RolePartners;

  @ApiPropertyOptional({ example: 'uuid()' })
  @IsOptional()
  @IsString()
  regionId?: string;

  @ApiPropertyOptional({ example: 'Toshkent' })
  @IsOptional()
  @IsString()
  adress?: string;

  @ApiPropertyOptional({ example: 'uuid()' })
  @IsOptional()
  @IsString()
  userId?: string;


  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    enum: ['fullName', 'phone', 'balance', 'createdAt'],
    example: 'createdAt',
  })
  @IsOptional()
  @IsIn(['fullName', 'phone', 'balance', 'createdAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], example: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
