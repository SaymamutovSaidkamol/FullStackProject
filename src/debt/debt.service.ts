import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryDebtDto } from './dto/debt-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DebtService {
  constructor(private prisma: PrismaService) {}

  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }

  async findAll(dto: QueryDebtDto) {
    try {
      const {
        contractId,
        total,
        time,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
      } = dto;

      const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
      const take = parseInt(String(limit));

      const where: any = {
        ...(contractId !== undefined && { contractId }),
        ...(total && { total: { contains: total, mode: 'insensitive' } }),
        ...(time && { time: { contains: time, mode: 'insensitive' } }),
      };

      const total1 = await this.prisma.debt.count({ where });

      const data = await this.prisma.debt.findMany({
        where,
        orderBy: {
          [sortBy]: order,
        },
        skip,
        take,
      });

      const totalPages = Math.ceil(total1 / take);

      return {
        data,
        total1,
        page: Number(page),
        limit: take,
        totalPages,
      };
    } catch (error) {
      this.Error(error);
    }
  }

  async findOne(id: string) {
    let OneDebt = await this.prisma.debt.findFirst({ where: { id } });

    if (!OneDebt) {
      throw new NotFoundException('Debt not found');
    }

    return { data: OneDebt };
  }
}
