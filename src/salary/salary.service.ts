import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}

  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }

  async create(data: CreateSalaryDto, req: Request) {
    try {
      const userId = req['user']?.id;

      if (!userId) {
        throw new BadRequestException('User ID not found');
      }

      let checkUserId = await this.prisma.user.findFirst({
        where: { id: data.userId },
      });

      if (!checkUserId) {
        throw new NotFoundException('User not found');
      }

      let newCateg = await this.prisma.salary.create({
        data: {
          amount: data.amount,
          comment: data.comment,
          userId,
        },
      });

      return { data: newCateg };
    } catch (error) {
      this.Error(error);
    }
  }

  async findAll() {
    try {
      let allCateg = await this.prisma.salary.findMany();

      return { data: allCateg };
    } catch (error) {
      this.Error(error);
    }
  }

  async findOne(id: string) {
    try {
      let checkCateg = await this.prisma.salary.findFirst({ where: { id } });

      if (!checkCateg) {
        throw new NotFoundException('Salary not found');
      }

      return { data: checkCateg };
    } catch (error) {
      this.Error(error);
    }
  }

  async update(id: string, data: UpdateSalaryDto, req: Request) {
    try {
      data.userId = req['user'].userId;

      let checkCateg = await this.prisma.salary.findFirst({ where: { id } });

      if (!checkCateg) {
        throw new NotFoundException('Salary not found');
      }

      let updateCateg = await this.prisma.salary.updateMany({
        where: { id },
        data,
      });

      return { data: updateCateg, message: 'Salary updated successfully' };
    } catch (error) {
      this.Error(error);
    }
  }

  async remove(id: string) {
    try {
      let checkCateg = await this.prisma.salary.findFirst({ where: { id } });

      if (!checkCateg) {
        throw new NotFoundException('Salary not found');
      }

      let delPartner = await this.prisma.salary.delete({ where: { id } });

      return { data: delPartner, message: 'Salary deleted successfully' };
    } catch (error) {
      this.Error(error);
    }
  }
}
