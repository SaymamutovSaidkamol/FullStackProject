import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentType, type } from 'src/enums/enums';

export class CreatePaymentDto {
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
  debtId: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: '3 oylik to`lov',
    required: true,
  })
  @IsString()
  comment: string;

  @ApiProperty({
    example: PaymentType.CASH,
    required: true,
  })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty({
    example: type.IN,
    required: true,
  })
  @IsEnum(type)
  type: type;
}
