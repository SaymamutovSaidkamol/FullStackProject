import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({
    example: 'uuid',
    description: 'Foydalanuvchining telefon raqami',
    required: true,
  })
  @IsString()
  userId: string;
}
