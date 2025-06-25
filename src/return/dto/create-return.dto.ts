import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateReturnDto {
    
  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  contractId: string;

  @ApiProperty({
    example: true,
    required: true,
  })
  @IsBoolean()
  isNew: boolean;

  @ApiProperty({
    example: 'Yoqmadi',
    required: true,
  })
  @IsString()
  reason: string;
}
