import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
    example: 'Password_123!',
    description: 'Foydalanuvchining paroli',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
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

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Foydalanuvchining Email',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'example.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}

export class LoginUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Foydalanuvchining telefon raqami',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password_123!',
    description: 'Foydalanuvchining paroli',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SendOtpUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Foydalanuvchining telefon raqami',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class VerifyUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Foydalanuvchining telefon raqami',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '23456',
    description: 'Yuborilgan code ni kriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class VerifyResetPasswordUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Foydalanuvchining telefon raqami',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password_123!',
    description: 'Yangi parolni kriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  new_password: string;

  @ApiProperty({
    example: '23456',
    description: 'Yuborilgan code ni kriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export function isValidUzbekPhoneNumber(phoneNumber: string): boolean {
  const cleaned = phoneNumber.replace(/[\s\-]/g, '');

  const regex = /^\+998(33|88|9[0-5|7-9])\d{7}$/;

  return regex.test(cleaned);
}

export function StrongPassword(password: string): boolean {
  const minLength = /.{6,}/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasDigit = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    minLength.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasDigit.test(password) &&
    hasSpecialChar.test(password)
  );
}
