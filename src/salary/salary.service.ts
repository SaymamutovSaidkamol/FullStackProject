import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateSalaryDto) {
    let checkUserId = await this.prisma.user.findFirst({
      where: { id: data.userId },
    });

    if (!checkUserId) {
      throw new NotFoundException('User not found');
    }

    let newCateg = await this.prisma.salary.create({ data });

    return { data: newCateg };
  }

  async findAll() {
    let allCateg = await this.prisma.salary.findMany();

    return { data: allCateg };
  }

  async findOne(id: string) {
    let checkCateg = await this.prisma.salary.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Salary not found');
    }

    return { data: checkCateg };
  }

  async update(id: string, data: UpdateSalaryDto) {
    let checkCateg = await this.prisma.salary.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Salary not found');
    }

    let updateCateg = await this.prisma.salary.updateMany({
      where: { id },
      data,
    });

    return { data: updateCateg, message: 'Salary updated successfully' };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.salary.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Salary not found');
    }

    let delPartner = await this.prisma.salary.delete({ where: { id } });

    return { data: delPartner, message: 'Salary deleted successfully' };
  }
}
