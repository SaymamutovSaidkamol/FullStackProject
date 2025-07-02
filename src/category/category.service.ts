import {
  BadGatewayException,
  BadRequestException,
  HttpException,
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
  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }
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
    try {
      const {
        title,
        time,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
      } = query;

      const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
      const take = parseInt(String(limit));

      const where: any = {
        ...(title && {
          title: { contains: title, mode: 'insensitive' },
        }),
        ...(time !== undefined && { time: Number(time) }),
      };

      const total = await this.prisma.category.count({ where });

      const data = await this.prisma.category.findMany({
        where,
        skip,
        take,
        orderBy: [{ [sortBy]: order }],
      });

      const totalPages = Math.ceil(total / take);

      return {
        data,
        total,
        page,
        limit: take,
        totalPages,
      };
    } catch (error) {
      this.Error(error);
    }
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
