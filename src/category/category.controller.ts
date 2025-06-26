import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RoleGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleUser } from 'src/enums/enums';
import { Roles } from 'src/decorators/role.decorators';
import { ApiOperation } from '@nestjs/swagger';
import { GetCategoryQueryDto } from './dto/GetCategoryQuery.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Faqat OWNER category qo`sha oladi',
    description:
      'Berilgan parametrlar bo‘yicha Faqat OWNER category qo`sha oladi',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Categorylarni hamma ko`rishi mumkun, filter, sort va paganation ',
    description:
      'Berilgan parametrlar bo‘yicha Categorylarni hamma ko`rishi mumkun, filter, sort va paganation ',
  })
  @Get()
  findAll(@Query() query: GetCategoryQueryDto) {
    return this.categoryService.findAll(query);
  }

  @ApiOperation({
    summary: 'Categorylarni ID si bo`yicha hamma ko`rolishi mumkun',
    description:
      'Berilgan parametrlar bo‘yicha Categorylarni ID si bo`yicha hamma ko`rolishi mumkun',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({
    summary: 'Faqat OWNER Categorylarni Update qila oladi',
    description:
      'Berilgan parametrlar bo‘yicha Faqat OWNER Categorylarni Update qila oladi',
  })
  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Faqat OWNER Categorylarni Delete qila oladi',
    description:
      'Berilgan parametrlar bo‘yicha Faqat OWNER Categorylarni Delete qila oladi',
  })
  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
