import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Phones',
    // description: '1 yil ishlatilgan xolati zo`r',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '4',
    description: '4',
    required: true,
  })
  @IsNumber()
  time: number;

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
