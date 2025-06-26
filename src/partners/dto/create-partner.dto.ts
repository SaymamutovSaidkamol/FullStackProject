import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { RolePartners } from 'src/enums/enums';

export class CreatePartnerDto {
  @ApiProperty({
    example: 'Saymamutov Saidkamol',
    required: true,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: '+998941234567',
    required: true,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: true,
    required: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 12000,
    required: true,
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    example: RolePartners.CURTOMER,
    required: true,
    enum: RolePartners,
  })
  @IsEnum(RolePartners)
  role: RolePartners;

  @ApiProperty({
    example: 'uuid()',
    description: 'Foydalanuvchining Roli',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  regionId: string;

  @ApiProperty({
    example: 'Toshkent',
    required: true,
  })
  @IsString()
  adress: string;

  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'example.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
