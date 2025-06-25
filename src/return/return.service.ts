import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReturnService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateReturnDto) {
    let checkContract = await this.prisma.contract.findFirst({
      where: { id: data.contractId },
    });

    if (!checkContract) {
      throw new NotFoundException('Contract not found');
    }

    let searchPartners = await this.prisma.partners.findFirst({
      where: { id: checkContract.partnerId },
    });

    if (searchPartners) {
      await this.prisma.partners.update({
        where: { id: searchPartners.id },
        data: { balance: searchPartners.balance + checkContract.sellPrice },
      });
    }

    let newReturmn = await this.prisma.return.create({ data });

    await this.prisma.debt.deleteMany({
      where: { contractId: data.contractId },
    });

    return { data: newReturmn };
  }

  async findAll() {
    let allReturn = await this.prisma.return.findMany();

    return { data: allReturn };
  }

  async findOne(id: string) {
    let oneReturn = await this.prisma.return.findFirst({ where: { id } });

    if (!oneReturn) {
      throw new NotFoundException('Return not found');
    }

    return { data: oneReturn };
  }

  async update(id: string, updateReturnDto: UpdateReturnDto) {
    return `This action updates a #${id} return`;
  }

  async remove(id: string) {
    return `This action removes a #${id} return`;
  }
}
