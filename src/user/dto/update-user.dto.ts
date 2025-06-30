import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleUser } from 'src/enums/enums';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Saidkamol',
    description: 'Foydalanuvchining ismi',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiProperty({
    example: '+998941234567',
    description: 'Foydalanuvchining telefon raqami',
    required: true,
  })
  @IsString()
  phone?: string;

  @ApiProperty({
    example: '12000',
    description: 'Foydalanuvchining balanchi',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  balance?: number;

  @ApiProperty({
    example: 'uuid()',
    description: 'Foydalanuvchining Roli',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  regionId?: string;
}

export class UpdateUserForAdminDto {
  @ApiProperty({
    example: RoleUser.ADMIN,
    description: 'Foydalanuvchining Roli',
    required: true,
  })
  @IsEnum(RoleUser)
  @IsNotEmpty()
  role?: RoleUser;
}
