import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  isValidUzbekPhoneNumber,
  LoginUserDto,
  StrongPassword,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { totp } from 'otplib';
import { JwtService } from '@nestjs/jwt';

totp.options = { step: 120 };
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(data: CreateUserDto) {
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
  }

  async login(data: LoginUserDto) {
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

    let accesToken = this.genAccessToken({
      userId: checkUser.id,
      role: checkUser.role,
    });
    let refreshToken = this.genRefreshToken({
      userId: checkUser.id,
      role: checkUser.role,
    });

    return { acces_token: accesToken, refresh_token: refreshToken };
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

  async findAll() {
    let allUsers = await this.prisma.user.findMany();

    return { data: allUsers };
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
