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

  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    example: '12000',
    description: 'Foydalanuvchining balanchi',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  balance?: number;

  @ApiProperty({
    example: RoleUser.ADMIN,
    description: 'Foydalanuvchining Roli',
    required: true,
  })
  @IsEnum(RoleUser)
  @IsNotEmpty()
  role?: RoleUser;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  image?: string;
}
