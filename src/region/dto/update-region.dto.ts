import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRegionDto {
  @ApiProperty({
    example: 'Namangan',
    required: true,
  })
  @IsString()
  name: string;
}
