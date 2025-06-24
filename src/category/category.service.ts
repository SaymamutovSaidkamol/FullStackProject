import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findAll() {
    let allCateg = await this.prisma.category.findMany();

    return { data: allCateg };
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

    return { data: updateCateg, message: "Category updated successfully" };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.category.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Category not found');
    }

    let delCateg = await this.prisma.category.delete({ where: { id } });

    return { data: delCateg, message: "Category deleted successfully" };
  }
}
