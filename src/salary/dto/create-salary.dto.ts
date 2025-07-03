import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSalaryDto {
  @ApiProperty({
    example: 4,
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'salom',
    required: true,
  })
  @IsString()
  comment: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
