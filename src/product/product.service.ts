import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductDto) {

    let checkUserId = await this.prisma.user.findFirst({
      where: { id: data.userId },
    });

    if (!checkUserId) {
      throw new NotFoundException('User not found');
    }

    let newCateg = await this.prisma.product.create({ data });

    return { data: newCateg };
  }

  async findAll() {
    let allCateg = await this.prisma.product.findMany();

    return { data: allCateg };
  }

  async findOne(id: string) {
    let checkCateg = await this.prisma.product.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Product not found');
    }

    return { data: checkCateg };
  }

  async update(id: string, data: UpdateProductDto) {
    let checkCateg = await this.prisma.product.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Product not found');
    }

    let updateCateg = await this.prisma.product.updateMany({
      where: { id },
      data,
    });

    return { data: updateCateg, message: 'Product updated successfully' };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.product.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Product not found');
    }

    let delPartner = await this.prisma.product.delete({ where: { id } });

    return { data: delPartner, message: 'Product deleted successfully' };
  }
}
