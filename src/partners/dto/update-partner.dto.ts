import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolePartners } from 'src/enums/enums';

export class UpdatePartnerDto {
  @ApiProperty({
    example: 'Saymamutov Saidkamol',
    required: false,
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    example: '+998941234567',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: 12000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  balance?: number;

  @ApiProperty({
    example: RolePartners.CURTOMER,
    required: false,
    enum: RolePartners,
  })
  @IsOptional()
  @IsEnum(RolePartners)
  role?: RolePartners;

  @ApiProperty({
    example: 'uuid()',
    description: 'Foydalanuvchining Roli',
    required: false,
  })
  @IsOptional()
  @IsString()
  regionId?: string;

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
  @IsOptional()
  @IsBoolean()
  pin?: boolean;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  archive?: boolean;

  @ApiProperty({
    example: 'Toshkent',
    required: false,
  })
  @IsOptional()
  @IsString()
  adress?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
