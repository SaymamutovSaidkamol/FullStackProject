import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
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

  @IsNumber()
  @IsOptional()
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
  @IsUUID()
  regionId: string;

  @ApiProperty({
    example: ['+998901112233', '+998909876543'],
    required: false,
    description: 'Qo‘shimcha telefon raqamlar',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  additional_phone_numbers?: string[];

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsBoolean()
  pin: boolean;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsBoolean()
  archive: boolean;

  @ApiProperty({
    example: 'Toshkent',
    required: true,
  })
  @IsString()
  adress: string;

  @ApiProperty({
    example: 'example.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
