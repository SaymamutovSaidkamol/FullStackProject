import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { unitsType } from 'src/enums/enums';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Saidkamol',
    required: false,
  })
  @IsString()
  userId?: string;

  @ApiProperty({
    example: 'Iphone 16 Pro Max',
    required: false,
  })
  @IsString()
  title?: string;

  @ApiProperty({
    example: 12000,
    required: false,
  })
  @IsNumber()
  sellPrice?: number;

  @ApiProperty({
    example: 10000,
    required: false,
  })
  @IsNumber()
  buyPrice?: number;

  @ApiProperty({
    example: 5,
    required: false,
  })
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    example: 'uuid',
    required: false,
  })
  @IsString()
  categoryId?: string;

  @ApiProperty({
    example: unitsType.DONA,
    required: false,
  })
  @IsEnum(unitsType)
  units?: unitsType;

  @ApiProperty({
    example: 'salom',
    required: false,
  })
  @IsString()
  comment?: string;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  @IsNotEmpty()
  image?: string;
}
