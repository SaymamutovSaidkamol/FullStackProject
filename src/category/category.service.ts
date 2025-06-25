import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCategoryQueryDto } from './dto/GetCategoryQuery.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCategoryDto) {
    let checkCateg = await this.prisma.category.findFirst({
      where: { title: data.title },
    });

    if (checkCateg) {
      throw new BadGatewayException('Category alredy exist');
    }

    let newCateg = await this.prisma.category.create({ data });

    return { data: newCateg };
  }

  async findAll(query: GetCategoryQueryDto) {
    const {
      isActive,
      title,
      time,
      sortField,
      sortOrder,
      page = '1',
      limit = '10',
    } = query;

    // 🔹 enum stringlarga aylantirildi
    const sortFieldStr = String(sortField);
    const sortOrderStr = String(sortOrder);

    // 🔹 Ruxsat etilgan fieldlar
    const validSortFields = ['title', 'time', 'isActive'];
    const validSortOrders = ['asc', 'desc'];

    // 🔹 Defaultga tushirish
    const finalSortField = validSortFields.includes(sortFieldStr)
      ? sortFieldStr
      : 'title';

    const finalSortOrder = validSortOrders.includes(sortOrderStr)
      ? sortOrderStr
      : 'asc';

    // 🔹 Filter
    const where: any = {};
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (time) where.time = +time;

    // 🔹 Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // 🔹 So‘rov
    const data = await this.prisma.category.findMany({
      where,
      skip,
      take,
      orderBy: {
        [finalSortField as string]: finalSortOrder,
      },
    });

    const total = await this.prisma.category.count({ where });

    return {
      data,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    };
  }

  async findOne(id: string) {
    let checkCateg = await this.prisma.category.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Category not found');
    }

    return { data: checkCateg };
  }

  async update(id: string, data: UpdateCategoryDto) {
    let checkCateg = await this.prisma.category.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Category not found');
    }

    let checkCategory = await this.prisma.category.findFirst({
      where: { title: data.title },
    });

    if (checkCategory) {
      throw new BadGatewayException('Category alredy exist');
    }

    let updateCateg = await this.prisma.category.updateMany({
      where: { id },
      data,
    });

    return { data: updateCateg, message: 'Category updated successfully' };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.category.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Category not found');
    }

    let delCateg = await this.prisma.category.delete({ where: { id } });

    return { data: delCateg, message: 'Category deleted successfully' };
  }
}
