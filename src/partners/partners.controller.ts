import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Request } from 'express';
import { RoleGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolePartners, RoleUser } from 'src/enums/enums';
import { Roles } from 'src/decorators/role.decorators';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { QueryPartnerDto } from './dto/query-partners.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: '🤝👮🏻‍♂️ Partner larni faqat OWNER lar create qla oladi 👮🏻‍♂️🤝',
    description:
      'Berilgan parametrlar bo‘yicha Partner larni faqat OWNER lar create qla oladi',
  })
  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto, @Req() req: Request) {
    return this.partnersService.create(createPartnerDto, req);
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: '👮🏻‍♂️🤝👀 Qadalgan Partner larni faqat OWNER lar ko`ra oladi 👀👮🏻‍♂️',
    description:
      'Berilgan parametrlar bo‘yicha Qadalgan Partner larni faqat OWNER lar ko`ra oladi',
  })
  @Get('pinned')
  Pinned() {
    return this.partnersService.pinned();
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'O`chirilgan Partner larni faqat OWNER lar ko`ra oladi',
    description:
      'Berilgan parametrlar bo‘yicha O`chirilgan Partner larni faqat OWNER lar ko`ra oladi',
  })
  @Get('disabled')
  DisabletPartners() {
    return this.partnersService.disablet();
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: '👮🏻‍♂️🤝👀 Arxiwlangan Partner larni faqat ADMIN, OWNER lar ko`ra oladi 👮🏻‍♂️🤝👀',
    description:
      'Berilgan parametrlar bo‘yicha Arxiwlangan Partner larni faqat ADMIN, OWNER lar ko`ra oladi',
  })
  @Get('archive')
  Archive() {
    return this.partnersService.archive();
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '👮🏻‍♂️🤝👀 Partner larni faqat O`zlari, ADMIN va OWNER lar ko`ra oladi👮🏻‍♂️🤝👀',
    description:
      'Berilgan parametrlar bo`yicha Partner larni faqat O`zlari, ADMIN va OWNER lar ko`ra oladi',
  })
  @Get()
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
  findAll(@Query() query: QueryPartnerDto) {
    return this.partnersService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '👮🏻‍♂️🤝👀 Partner ID si orqalik faqat ADMIN, OWNER lar ko`ra oladi 👮🏻‍♂️🤝👀',
    description:
      'Berilgan parametrlar bo`yicha Partner ID si orqalik faqat ADMIN, OWNER lar ko`ra oladi',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: '👮🏻‍♂️🤝🔀 Partner larni faqat OWNER lar Update qla oladi 👮🏻‍♂️🤝🔀',
    description:
      'Berilgan parametrlar bo`yicha Partner larni faqat OWNER lar Update qla oladi',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: '👮🏻‍♂️🤝❌ Partner larni faqat OWNER lar Delete qla oladi 👮🏻‍♂️🤝❌',
    description:
      'Berilgan parametrlar bo`yicha Partner larni faqat OWNER lar Delete qla oladi',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
