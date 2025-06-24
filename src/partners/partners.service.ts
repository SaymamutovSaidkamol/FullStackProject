import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidUzbekPhoneNumber } from 'src/user/dto/create-user.dto';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreatePartnerDto) {
    let checkCateg = await this.prisma.partners.findFirst({
      where: { phone: data.phone },
    });

    if (checkCateg) {
      throw new BadGatewayException('Category alredy exist');
    }

    if (isValidUzbekPhoneNumber(data.phone)) {
      throw new BadRequestException(
        'The phone number was entered incorrectly. example(+998941234567)',
      );
    }

    let checkUserId = await this.prisma.user.findFirst({
      where: { id: data.userId },
    });

    if (!checkUserId) {
      throw new NotFoundException('User not found');
    }

    let newCateg = await this.prisma.partners.create({ data });

    return { data: newCateg };
  }

  async findAll() {
    let allCateg = await this.prisma.partners.findMany();

    return { data: allCateg };
  }

  async findOne(id: string) {
    let checkCateg = await this.prisma.partners.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Partners not found');
    }

    return { data: checkCateg };
  }

  async update(id: string, data: UpdatePartnerDto) {
    let checkCateg = await this.prisma.partners.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Partners not found');
    }

    let checkCategory = await this.prisma.partners.findFirst({
      where: { phone: data.phone },
    });

    if (data.phone) {
      if (isValidUzbekPhoneNumber(data.phone)) {
        throw new BadRequestException(
          'The phone number was entered incorrectly. example(+998941234567)',
        );
      }
    }

    if (checkCategory) {
      throw new BadGatewayException('Partners alredy exist');
    }

    let updateCateg = await this.prisma.partners.updateMany({
      where: { id },
      data,
    });

    return { data: updateCateg, message: 'Partners updated successfully' };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.partners.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Partners not found');
    }

    let delPartner = await this.prisma.partners.delete({ where: { id } });

    return { data: delPartner, message: 'Partners deleted successfully' };
  }
}
