import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidUzbekPhoneNumber } from 'src/user/dto/create-user.dto';
import { Request } from 'express';
import { QueryPartnerDto } from './dto/query-partners.dto';

function normalizeBoolean(value: any): boolean | undefined {
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  return undefined;
}

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }

  async create(data: CreatePartnerDto, req: Request) {
    if (!isValidUzbekPhoneNumber(data.phone)) {
      console.log(isValidUzbekPhoneNumber(data.phone));

      throw new BadRequestException(
        'The phone number was entered incorrectly. example(+998941234567)',
      );
    }
    let checkUser = await this.prisma.partners.findFirst({
      where: { phone: data.phone },
    });

    if (checkUser) {
      throw new BadRequestException('User alredy exist');
    }

    let checkUserId = await this.prisma.user.findFirst({
      where: { id: req['user'].userId },
    });

    if (!checkUserId) {
      throw new NotFoundException('User not found');
    }

    let newCateg = await this.prisma.partners.create({
      data: {
        userId: String(req['user'].userId),
        fullName: data.fullName,
        phone: data.phone,
        isActive: data.isActive,
        balance: data.balance,
        role: data.role,
        regionId: data.regionId,
        adress: data.adress,
        image: data.image,
        pin: data.pin,
        additional_phone_numbers: data.additional_phone_numbers,
      },
    });

    return { data: newCateg };
  }

  async findAll(query: QueryPartnerDto) {
    try {
      const {
        fullName,
        phone,
        balance,
        role,
        regionId,
        adress,
        userId,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
      } = query;

      console.log(query);

      const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
      const take = parseInt(String(limit));

      const where: any = {
        isActive: true,
        ...(fullName && {
          fullName: { contains: fullName, mode: 'insensitive' },
        }),
        ...(phone && { phone: { contains: phone, mode: 'insensitive' } }),
        ...(adress && { adress: { contains: adress, mode: 'insensitive' } }),
        ...(balance !== undefined && { balance: Number(balance) }),
        ...(role && { role }),
        ...(regionId && { regionId }),
        ...(userId && { userId }),
      };

      const total = await this.prisma.partners.count({ where });

      const data = await this.prisma.partners.findMany({
        where,
        skip,
        take,
        orderBy: [{ pin: 'desc' }, { [sortBy]: order }],
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

    if (data.phone) {
      if (isValidUzbekPhoneNumber(data.phone)) {
        throw new BadRequestException(
          'The phone number was entered incorrectly. example(+998941234567)',
        );
      }

      let checkCategory = await this.prisma.partners.findFirst({
        where: { phone: data.phone },
      });
      if (checkCategory) {
        throw new BadRequestException('Partners alredy exist');
      }
    }

    if (data.regionId) {
      let checkRegion = await this.prisma.region.findFirst({
        where: { id: data.regionId },
      });

      if (!checkRegion) {
        throw new NotFoundException('Region Not Found');
      }
    }

    if (data.isActive === false) {
      data.pin = false;
    }

    if (data.balance! > 0 || data.balance! < 0) {
      throw new BadRequestException("You can't blow this partner away.");
    }

    return {
      data: await this.prisma.partners.updateMany({
        where: { id },
        data,
      }),
      message: 'Partners updated successfully',
    };
  }

  async remove(id: string) {
    let checkCateg = await this.prisma.partners.findFirst({ where: { id } });

    if (!checkCateg) {
      throw new NotFoundException('Partners not found');
    }

    let delPartner = await this.prisma.partners.update({
      where: { id },
      data: { isActive: false },
    });

    return { data: delPartner, message: 'Partners deleted successfully' };
  }

  async pinned() {
    try {
      let PinnedPartners = await this.prisma.partners.findMany({
        where: { pin: true },
        include: { region: true, Contract: true, Buy: true },
      });

      return { data: PinnedPartners };
    } catch (error) {
      this.Error(error);
    }
  }

  async archive() {
    try {
      let PinnedPartners = await this.prisma.partners.findMany({
        where: { archive: true },
        include: {
          region: true,
          Contract: true,
          Buy: true,
          Payment: true,
          user: {
            select: {
              fullName: true,
              balance: true,
              email: true,
              phone: true,
              role: true,
            },
          },
        },
      });

      return { data: PinnedPartners };
    } catch (error) {
      this.Error(error);
    }
  }

  async disablet() {
    try {
      let PinnedPartners = await this.prisma.partners.findMany({
        where: { isActive: false },
        include: {
          region: true,
          Contract: true,
          Buy: true,
          Payment: true,
          user: {
            select: {
              fullName: true,
              balance: true,
              email: true,
              phone: true,
              role: true,
            },
          },
        },
      });

      return { data: PinnedPartners };
    } catch (error) {
      this.Error(error);
    }
  }
}
