import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReturnService {
  constructor(private prisma: PrismaService) {}

  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }

  async create(data: CreateReturnDto) {
    try {
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
    } catch (error) {
      this.Error(error);
    }
  }

  async findAll() {
    try {
      let allReturn = await this.prisma.return.findMany();

      return { data: allReturn };
    } catch (error) {
      this.Error(error);
    }
  }

  async findOne(id: string) {
    try {
      let oneReturn = await this.prisma.return.findFirst({ where: { id } });

      if (!oneReturn) {
        throw new NotFoundException('Return not found');
      }

      return { data: oneReturn };
    } catch (error) {
      this.Error(error);
    }
  }

  async update(id: string, data: UpdateReturnDto) {
    try {
      return `This action updates a #${id} return`;
    } catch (error) {
      this.Error(error);
    }
  }

  async remove(id: string) {
    try {
      return `This action removes a #${id} return`;
    } catch (error) {
      this.Error(error);
    }
  }
}
