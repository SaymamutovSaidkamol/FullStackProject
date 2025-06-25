import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolePartners } from 'src/enums/enums';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}
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

    let newCateg = await this.prisma.payment.create({ data });

    return { data: newCateg };
  }

  async findAll() {
    let allCateg = await this.prisma.payment.findMany();

    return { data: allCateg };
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
