import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateBuyDto {
    
  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  partnerId: string;

  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 5000,
    required: true,
  })
  @IsNumber()
  buyPrice: number;

  @ApiProperty({
    example: 'salom',
    required: true,
  })
  @IsString()
  comment: string;
}
