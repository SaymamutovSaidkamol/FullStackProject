import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateContractDto {
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
    example: 12000,
    required: true,
  })
  @IsNumber()
  sellPrice?: number;

  @ApiProperty({
    example: 10000,
    required: true,
  })
  @IsNumber()
  buyPrice?: number;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsNumber()
  time: number;
}
