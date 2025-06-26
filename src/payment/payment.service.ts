import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolePartners, type } from 'src/enums/enums';
import { QueryPaymentnDto } from './dto/payment-query.dt';
// import { type } from '../enums/enums';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }

  async create(data: CreatePaymentDto) {
    let checkUser = await this.prisma.user.findFirst({
      where: { id: data.userId },
    });

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }

    let checkParner = await this.prisma.partners.findFirst({
      where: { id: data.partnerId },
    });

    if (!checkParner) {
      throw new NotFoundException('Partner not found');
    }

    let checkDebt = await this.prisma.debt.findFirst({
      where: { id: data.debtId },
    });

    if (!checkDebt) {
      throw new NotFoundException('Debt not found');
    }

    if (checkParner.role === RolePartners.CURTOMER && checkDebt.time >= 1) {
      let updatedebt = await this.prisma.debt.update({
        where: { id: data.debtId },
        data: { total: checkDebt.total - data.amount, time: -1 },
      });
    }

    if ((data.type = type.IN)) {
      await this.prisma.partners.update({
        where: { id: data.partnerId },
        data: { balance: checkParner.balance - data.amount },
      });
    }

    let newCateg = await this.prisma.payment.create({ data });

    return { data: newCateg };
  }

  async findAll(dto: QueryPaymentnDto) {
  try {
    const {
      amount,
      comment,
      partnerId,
      userId,
      paymentType,
      type,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = dto;

    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
    const take = parseInt(String(limit));

    const where: any = {
      ...(amount !== undefined && { amount }),
      ...(comment && { comment: { contains: comment, mode: 'insensitive' } }),
      ...(partnerId && { partnerId: { contains: partnerId, mode: 'insensitive' } }),
      ...(userId && { userId: { contains: userId, mode: 'insensitive' } }),
      ...(paymentType && { paymentType }),
      ...(type && { type }),
    };

    const total = await this.prisma.payment.count({ where });

    const data = await this.prisma.payment.findMany({
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
      page,
      limit: take,
      totalPages,
    };
  } catch (error) {
    this.Error(error);
  }
}


  async findOne(id: string) {
    let checkCateg = await this.prisma.payment.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Payment not found');
    }

    return { data: checkCateg };
  }

  async update(id: string, data: UpdatePaymentDto) {
    let checkCateg = await this.prisma.payment.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Payment not found');
    }

    let updateCateg = await this.prisma.payment.updateMany({
      where: { id },
      data,
    });

    return { data: updateCateg, message: 'Payment updated successfully' };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.payment.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Payment not found');
    }

    let delCateg = await this.prisma.payment.delete({ where: { id } });

    return { data: delCateg, message: 'Payment deleted successfully' };
  }
}
