import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { DebtService } from './debt.service';
import { ApiResponse } from '@nestjs/swagger';
import { QueryDebtDto } from './dto/debt-query.dto';

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
  @Get()
  findAll(@Query() query: QueryDebtDto) {
    return this.debtService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtService.findOne(id);
  }
}
