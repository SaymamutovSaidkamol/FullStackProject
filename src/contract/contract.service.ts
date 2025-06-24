import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContractDto) {
    let checkUser = await this.prisma.user.findFirst({
      where: { id: data.userId },
    });

    if (!checkUser) {
      throw new NotFoundException('User not found');
    }

    let checkPartner = await this.prisma.partners.findFirst({
      where: { id: data.partnerId },
    });

    if (!checkPartner) {
      throw new NotFoundException('Partner not found');
    }

    let checkProd = await this.prisma.product.findFirst({
      where: { id: data.productId },
    });

    if (!checkProd) {
      throw new NotFoundException('Product not found');
    }

    if (checkProd.quantity < data.quantity) {
      throw new BadRequestException('The product quantity is not enough.');
    }

    if (!data.buyPrice) {
      data.buyPrice = checkProd.buyPrice;
    }

    if (!data.sellPrice) {
      data.sellPrice = checkProd.sellPrice;
    }

    let newCateg = await this.prisma.contract.create({
      data: {
        userId: data.userId,
        partnerId: data.partnerId,
        productId: data.productId,
        quantity: data.quantity,
        sellPrice: data.sellPrice,
        buyPrice: data.buyPrice,
        time: data.time,
      },
    });

    let newDebt = await this.prisma.debt.create({
      data: {
        contractId: newCateg.id,
        total: newCateg.sellPrice,
        time: newCateg.time,
      },
    });

    return { data: newCateg };
  }

  async findAll() {
    let allCateg = await this.prisma.contract.findMany();

    return { data: allCateg };
  }

  async findOne(id: string) {
    let checkCateg = await this.prisma.contract.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Contract not found');
    }

    return { data: checkCateg };
  }
}
