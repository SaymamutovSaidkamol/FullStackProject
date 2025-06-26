import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryRegionDto } from './dto/region-query.dto';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }

  async create(data: CreateRegionDto) {
    let checkCateg = await this.prisma.region.findFirst({
      where: { name: data.name },
    });

    if (checkCateg) {
      throw new BadGatewayException('Region alredy exist');
    }

    let newCateg = await this.prisma.region.create({ data });

    return { data: newCateg };
  }

  async findAll(dto: QueryRegionDto) {
    try {
      const {
        name,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
      } = dto;

      const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
      const take = parseInt(String(limit));

        const where: any = {
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      }),
    };

      const total = await this.prisma.region.count({ where });

      const data = await this.prisma.region.findMany({
        where,
        orderBy: {
          [sortBy]: order,
        },
        skip,
        take,
      });

      const totalPages = Math.ceil(total / take);

      return {
        data,
        total,
        page: Number(page),
        limit: take,
        totalPages,
      };
    } catch (error) {
      this.Error(error);
    }
  }

  async findOne(id: string) {
    let checkCateg = await this.prisma.region.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Region not found');
    }

    return { data: checkCateg };
  }

  async update(id: string, data: UpdateRegionDto) {
    let checkCateg = await this.prisma.region.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Region not found');
    }

    if (data.name) {
      let checkRegion = await this.prisma.region.findFirst({
        where: { name: data.name },
      });

      if (checkRegion) {
        throw new BadGatewayException('Region alredy exist');
      }
    }

    let updateCateg = await this.prisma.region.updateMany({
      where: { id },
      data,
    });

    return { data: updateCateg, message: 'Region updated successfully' };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.region.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Region not found');
    }

    let delCateg = await this.prisma.region.delete({ where: { id } });

    return { data: delCateg, message: 'Region deleted successfully' };
  }
}
