import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { RoleUser } from 'src/enums/enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'Saidkamol',
    description: 'Foydalanuvchining ismi',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '+998941234567',
    description: 'Foydalanuvchining telefon raqami',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'password_123!',
    description: 'Foydalanuvchining paroli',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    example: '12000',
    description: 'Foydalanuvchining balanchi',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @ApiProperty({
    example: RoleUser.ADMIN,
    description: 'Foydalanuvchining Roli',
    required: true,
  })
  @IsEnum(RoleUser)
  @IsNotEmpty()
  role: RoleUser;
}
