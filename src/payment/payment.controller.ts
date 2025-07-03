import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryPaymentnDto } from './dto/payment-query.dt';
import { Request } from 'express';
import { Roles } from 'src/decorators/role.decorators';
import { RoleUser } from 'src/enums/enums';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles(RoleUser.OWNER, RoleUser.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary:
      '💸👮🏻‍♂️👮‍♀️ Payment larni faqat OWNER, ADMIN lar create qla oladi 👮🏻‍♂️👮‍♀️💸',
    description:
      'Berilgan parametrlar bo‘yicha Payment larni faqat OWNER, ADMIN lar create qla oladi',
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req: Request) {
    return this.paymentService.create(createPaymentDto, req);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '💸👮🏻‍♂️👮‍♀️ Payment larni faqat OWNER, ADMIN lar get oladi 👮🏻‍♂️👮‍♀️💸',
    description:
      'Berilgan parametrlar bo‘yicha Payment larni faqat OWNER, ADMIN lar get oladi',
  })
  @Get()
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
  findAll(@Query() query: QueryPaymentnDto) {
    return this.paymentService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '💸👮🏻‍♂️👮‍♀️ Payment larni ID si orqalik faqat OWNER, ADMIN lar get oladi 👮🏻‍♂️👮‍♀️💸',
    description:
      'Berilgan parametrlar bo‘yicha Payment larni ID si orqalik faqat OWNER, ADMIN lar get oladi',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary:
      '💸👮🏻‍♂️ Payment larni faqat OWNER lar update qla oladi 👮🏻‍♂️💸',
    description:
      'Berilgan parametrlar bo‘yicha Payment larni faqat OWNER lar update qla oladi',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '💸👮🏻‍♂️ Payment larni faqat OWNER lar delete qla oladi 👮🏻‍♂️💸',
    description:
      'Berilgan parametrlar bo‘yicha Payment larni faqat OWNER lar delete qla oladi',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
