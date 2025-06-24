import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Phones',
    required: true,
  })
  @IsString()
  title?: string;

  @ApiProperty({
    example: '4',
    description: '4',
    required: true,
  })
  @IsNumber()
  time?: number;

  @ApiProperty({
    example: true,
    required: true,
  })
  @IsBoolean()
  isActive?: boolean;
}
