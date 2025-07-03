import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentType, type } from 'src/enums/enums';

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  partnerId: string;

  @ApiProperty({
    example: '3 oylik to`lov',
    required: true,
  })
  @IsOptional()
  @IsString()
  debtId?: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: '3 oylik to`lov',
    required: true,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsEnum(PaymentType)
  paymentType?: PaymentType;

  @ApiProperty({
    example: type.IN,
    required: true,
  })
  @IsOptional()
  @IsEnum(type)
  type?: type;
}
