import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  isValidUzbekPhoneNumber,
  LoginUserDto,
  SendOtpUserDto,
  StrongPassword,
  VerifyResetPasswordUserDto,
  VerifyUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserForAdminDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { totp } from 'otplib';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { Request } from 'express';
import { QueryUserDto } from './dto/user-query.dto';

totp.options = { step: 300 };
@Injectable()
export class UserService {
  private transporter;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'saymamutovsaidkamol6@gmail.com',
        pass: 'elhx txxs pdhn ggvs',
      },
    });
  }

  private Error(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }

  async sendOtp(data: SendOtpUserDto) {
    try {
      let checkUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      let otp = totp.generate('secret' + data.email);

      const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #4a90e2;">One-Time Password (OTP)</h2>
          <p style="font-size: 16px; color: #333;">Assalomu alaykum,</p>
          <p style="font-size: 16px; color: #333;">
            Tizimga kirish uchun quyidagi bir martalik koddan foydalaning:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; background: #eaf1fe; color: #2d5be3; padding: 15px 25px; border-radius: 8px; letter-spacing: 6px;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #777;">Kod 5 daqiqa davomida amal qiladi. Hech kim bilan ulashmang.</p>
        </div>
      </div>
    `;

      await this.transporter.sendMail({
        from: '"MyApp" <saymamutovsaidkamol6@gmail.com>',
        to: data.email,
        subject: 'Sizning OTP kodingiz',
        html,
      });

      return { message: 'OTP muvaffaqiyatlik yuborildi✅', otp };
    } catch (error) {
      this.Error(error);
    }
  }

  async verify(data: VerifyUserDto) {
    try {
      let checkUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      console.log(checkUser);

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      let secret = 'secret' + data.email;

      let verifyOtp = totp.verify({ token: data.otp, secret });

      if (!verifyOtp) {
        throw new BadRequestException('Invalid Otp');
      }

      let updateUser = await this.prisma.user.update({
        where: { id: checkUser.id },
        data: { isActive: true },
      });

      return { message: 'Success activated✅' };
    } catch (error) {
      this.Error(error);
    }
  }

  async resetPasswordOtp(data: SendOtpUserDto) {
    try {
      let checkUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      console.log(checkUser);

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      let otp = totp.generate('secret-password' + data.email);

      const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #4a90e2;">Reset Password (OTP)</h2>
          <p style="font-size: 16px; color: #333;">Assalomu alaykum,</p>
          <p style="font-size: 16px; color: #333;">
            Tizimga kirish uchun quyidagi bir martalik koddan foydalaning:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; background: #eaf1fe; color: #2d5be3; padding: 15px 25px; border-radius: 8px; letter-spacing: 6px;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #777;">Kod 5 daqiqa davomida amal qiladi. Hech kim bilan ulashmang.</p>
        </div>
      </div>
    `;

      await this.transporter.sendMail({
        from: '"MyApp" <saymamutovsaidkamol6@gmail.com>',
        to: data.email,
        subject: 'Sizning OTP kodingiz',
        html,
      });

      return { message: 'OTP muvaffaqiyatlik yuborildi✅', otp };
    } catch (error) {
      this.Error(error);
    }
  }

  async resetPasswordVerify(data: VerifyResetPasswordUserDto) {
    try {
      let checkUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      let secret = 'secret-password' + data.email;

      if (!StrongPassword(data.new_password)) {
        throw new BadRequestException(
          "Your password invalid. Example('Saidkamol1!')",
        );
      }

      let verifyOtp = totp.verify({ token: data.otp, secret });

      if (!verifyOtp) {
        throw new BadRequestException('Invalid Otp');
      }

      let hashPassword = bcrypt.hashSync(data.new_password, 7);

      let updateUser = await this.prisma.user.update({
        where: { id: checkUser.id },
        data: { password: hashPassword },
      });

      return { message: 'Password changed successfully✅', data: updateUser };
    } catch (error) {
      this.Error(error);
    }
  }

  async create(data: CreateUserDto) {
    try {
      const SearchUser = await this.prisma.user.findFirst({
        where: { phone: data.phone },
      });

      if (SearchUser) {
        throw new BadRequestException('This user alredy exist');
      }

      if (!isValidUzbekPhoneNumber(data.phone)) {
        throw new BadRequestException(
          'The phone number was entered incorrectly. example(+998941234567)',
        );
      }

      if (!StrongPassword(data.password)) {
        throw new BadRequestException(
          "Your password invalid. Example('Saidkamol1!')",
        );
      }

      let checkRegion = await this.prisma.region.findFirst({
        where: { id: data.regionId },
      });

      if (!checkRegion) {
        throw new NotFoundException('Region not found');
      }

      if (data.balance < 0) {
        throw new BadRequestException('Error balance has been deducted.');
      }

      let hashPassword = bcrypt.hashSync(data.password, 7);

      data = { ...data, password: hashPassword };

      let newUser = await this.prisma.user.create({ data });

      return {
        message: 'created successfully✅',
        data: newUser,
      };
    } catch (error) {
      this.Error(error);
    }
  }

  async login(data: LoginUserDto) {
    try {
      let checkUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      let checkPassword = bcrypt.compareSync(data.password, checkUser.password);

      if (!checkPassword) {
        throw new BadRequestException('Wrong password');
      }

      if (checkUser.isActive == false) {
        throw new BadRequestException('Please activate your account.');
      }

      let accesToken = this.genAccessToken({
        userId: checkUser.id,
        role: checkUser.role,
      });
      let refreshToken = this.genRefreshToken({
        userId: checkUser.id,
        role: checkUser.role,
      });

      return { acces_token: accesToken, refresh_token: refreshToken };
    } catch (error) {
      this.Error(error);
    }
  }

  genRefreshToken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: 'refresh_secrest',
      expiresIn: '7d',
    });
  }

  genAccessToken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: 'access_secret',
      expiresIn: '12h',
    });
  }

  async findAll(dto: QueryUserDto) {
    try {
      const {
        fullName,
        phone,
        isActive,
        regionId,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
      } = dto;

      const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
      const take = parseInt(String(limit));

      // isActive ni boolean ga o‘girish
      let parsedIsActive: boolean | undefined;
      if (typeof isActive === 'string') {
        parsedIsActive = isActive === 'true';
      } else if (typeof isActive === 'boolean') {
        parsedIsActive = isActive;
      }

      const where: any = {
        ...(fullName && {
          fullName: {
            contains: fullName,
            mode: 'insensitive',
          },
        }),
        ...(phone && {
          phone: {
            contains: phone,
            mode: 'insensitive',
          },
        }),
        ...(parsedIsActive !== undefined && {
          isActive: parsedIsActive,
        }),
        ...(regionId && {
          regionId,
        }),
      };

      const total = await this.prisma.user.count({ where });

      const data = await this.prisma.user.findMany({
        where,
        orderBy: {
          [sortBy]: order,
        },
        skip,
        take,
      });

      console.log(typeof isActive, isActive);

      const totalPages = Math.ceil(total / take);

      return {
        data,
        total,
        page: Number(page),
        limit: take,
        totalPages,
      };
    } catch (error) {
      this.Error(error);
    }
  }

  async findOne(id: string) {
    try {
      let oneUser = await this.prisma.user.findFirst({ where: { id } });

      if (!oneUser) {
        throw new NotFoundException('User not Found');
      }

      return { data: oneUser };
    } catch (error) {
      this.Error(error);
    }
  }

  async update(id: string, data: UpdateUserForAdminDto) {
    try {
      let checkUser = await this.prisma.user.findFirst({ where: { id } });

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'User changet successfully✅',
        data: await this.prisma.user.update({
          where: { id },
          data: { role: data.role },
        }),
      };
    } catch (error) {
      this.Error(error);
    }
  }

  async updateUser(id, data: UpdateUserDto, req: Request) {
    try {
      let checkUser = await this.prisma.user.findFirst({ where: { id } });

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      if (data.phone && !isValidUzbekPhoneNumber(data.phone)) {
        throw new BadRequestException(
          'The phone number was entered incorrectly. example(+998941234567)',
        );
      }

      if (req['user'].userId !== id && req['user'].role != 'OWNER') {
        throw new ForbiddenException('You are not allowed.');
      }

      let checkRegion = await this.prisma.region.findFirst({
        where: { id: data.regionId },
      });

      if (!checkRegion) {
        throw new NotFoundException('Region not found');
      }

      let checkUserPhone = await this.prisma.user.findFirst({
        where: { phone: data.phone },
      });

      if (checkUserPhone) {
        throw new BadRequestException('This user alredy exist');
      }

      return {
        message: 'User changet successfully',
        data: await this.prisma.user.update({ where: { id }, data }),
      };
    } catch (error) {
      this.Error(error);
    }
  }

  async remove(id: string, req: Request) {
    try {
      let checkUser = await this.prisma.user.findFirst({ where: { id } });

      if (!checkUser) {
        throw new NotFoundException('User not found');
      }

      if (req['user'].role !== 'OWNER' && id !== req['user'].userId) {
        throw new ForbiddenException('You are not allowed.');
      }

      return {
        message: 'User deleted successfully✅',
        data: await this.prisma.user.delete({ where: { id } }),
      };
    } catch (error) {
      this.Error(error);
    }
  }
}
