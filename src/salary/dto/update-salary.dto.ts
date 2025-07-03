import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSalaryDto {
  @ApiProperty({
    example: 4,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    example: 'salom',
    required: true,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
