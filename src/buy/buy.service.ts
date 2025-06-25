import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolePartners } from 'src/enums/enums';

@Injectable()
export class BuyService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateBuyDto) {
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

    if (checkPartner.role != RolePartners.SELLER) {
      throw new BadRequestException('You are not given this right.');
    }

    let checkProd = await this.prisma.product.findFirst({
      where: { id: data.productId },
    });

    if (!checkProd) {
      throw new NotFoundException('Product not found');
    }

    let oldPriceProd = checkProd.quantity * checkProd.buyPrice;
    let newPriceProd = data.quantity * data.quantity;
    let gathered = oldPriceProd + newPriceProd;

    let newQuantityProd = checkProd.quantity + data.quantity;
    let average_priceProd = gathered / newQuantityProd;

    let updateProd = await this.prisma.product.updateMany({
      where: { id: data.productId },
      data: { buyPrice: average_priceProd, quantity: newQuantityProd },
    });

    let newTransaction = await this.prisma.buy.create({ data });

    return { data: newTransaction };
  }

  async findAll() {
    let allTransaction = await this.prisma.buy.findMany();

    return { data: allTransaction };
  }

  async findOne(id: string) {
    let oneTransaction = await this.prisma.buy.findFirst({ where: { id } });

    if (!oneTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    return { data: oneTransaction };
  }

  update(id: string, updateBuyDto: UpdateBuyDto) {
    return `This action updates a #${id} buy`;
  }

  remove(id: string) {
    return `This action removes a #${id} buy`;
  }
}
