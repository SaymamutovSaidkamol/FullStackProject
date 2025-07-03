import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { Request } from 'express';
import { Roles } from 'src/decorators/role.decorators';
import { RoleUser } from 'src/enums/enums';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSalaryDto: CreateSalaryDto, @Req() req: Request) {
    return this.salaryService.create(createSalaryDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.salaryService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto,  @Req() req: Request) {
    return this.salaryService.update(id, updateSalaryDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryService.remove(id);
  }
}
