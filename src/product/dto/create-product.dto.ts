import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { unitsType } from 'src/enums/enums';

export class CreateProductDto {
  @ApiProperty({
    example: 'Saidkamol',
    required: true,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'Iphone 16 Pro Max',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 12000,
    required: true,
  })
  @IsNumber()
  sellPrice: number;

  @ApiProperty({
    example: 10000,
    required: true,
  })
  @IsNumber()
  buyPrice: number;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: unitsType.DONA,
    required: true,
  })
  @IsEnum(unitsType)
  units: unitsType;

  @ApiProperty({
    example: 'salom',
    required: true,
  })
  @IsString()
  comment: string;

  @ApiProperty({
    example: true,
    required: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 'example.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
