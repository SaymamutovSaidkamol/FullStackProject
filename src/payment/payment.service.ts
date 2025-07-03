import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolePartners, type } from 'src/enums/enums';
import { QueryPaymentnDto } from './dto/payment-query.dt';
import { Request } from 'express';
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

  async create(data: CreatePaymentDto, req: Request) {
    try {
      const userId = req['user'].userId;
      if (!userId) throw new UnauthorizedException();
      data.userId = req['user'].userId;

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

      if (data.debtId) {
        let checkDebt = await this.prisma.debt.findFirst({
          where: { id: data.debtId },
        });

        if (!checkDebt) {
          throw new NotFoundException('Debt not found');
        }

        if (checkParner.role === RolePartners.CUSTOMER) {
          let updatedebt = await this.prisma.debt.update({
            where: { id: data.debtId },
            data: { total: checkDebt.total - data.amount },
          });
        }
      }

      if (data.type === type.IN) {
        await this.prisma.partners.update({
          where: { id: checkParner.id },
          data: { balance: checkParner.balance - data.amount },
        });
      } else if (data.type === type.OUT) {
        await this.prisma.partners.update({
          where: { id: checkParner.id },
          data: { balance: checkParner.balance + data.amount },
        });
      }

      let newpayment = await this.prisma.payment.create({
        data: { ...data, userId },
      });

      return { data: newpayment, message: 'Payment was successful✅' };
    } catch (error) {
      this.Error(error);
    }
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
        ...(partnerId && {
          partnerId: { contains: partnerId, mode: 'insensitive' },
        }),
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
    try {
      let checkCateg = await this.prisma.payment.findFirst({ where: { id } });

      if (!checkCateg) {
        throw new NotFoundException('Payment not found');
      }

      return { data: checkCateg };
    } catch (error) {
      this.Error(error);
    }
  }

  async update(id: string, data: UpdatePaymentDto) {
    try {
      let checkPayment = await this.prisma.payment.findFirst({ where: { id } });

      if (!checkPayment) {
        throw new NotFoundException('Payment not found');
      }

      let checkPartner = await this.prisma.partners.findFirst({
        where: { id: checkPayment.partnerId },
      });

      if (!checkPartner) {
        throw new NotFoundException('Partner not found');
      }

      if (data.partnerId) {
        let checkDebt = await this.prisma.debt.findFirst({
          where: { id: data.debtId },
        });

        if (!checkDebt) {
          throw new NotFoundException('Debt not found');
        }

        if (checkPartner.role === RolePartners.CUSTOMER) {
          let updatedebt = await this.prisma.debt.update({
            where: { id: data.debtId },
            data: { total: checkDebt.total - data.amount },
          });
        }
      }

      if (data.type === type.IN) {
        await this.prisma.partners.update({
          where: { id: checkPartner.id },
          data: { balance: checkPartner.balance - data.amount },
        });
      } else if (data.type === type.OUT) {
        await this.prisma.partners.update({
          where: { id: checkPartner.id },
          data: { balance: checkPartner.balance + data.amount },
        });
      }

      let updatePayment = await this.prisma.payment.update({
        where: { id },
        data,
      });

      return { data: updatePayment, message: 'Payment updated successfully' };
    } catch (error) {
      this.Error(error);
    }
  }

  async remove(id: string) {
    try {
      let checkCateg = await this.prisma.payment.findFirst({ where: { id } });

      if (!checkCateg) {
        throw new NotFoundException('Payment not found');
      }

      let delCateg = await this.prisma.payment.delete({ where: { id } });

      return { data: delCateg, message: 'Payment deleted successfully' };
    } catch (error) {
      this.Error(error);
    }
  }
}
