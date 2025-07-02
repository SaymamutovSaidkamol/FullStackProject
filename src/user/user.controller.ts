import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  LoginUserDto,
  SendOtpUserDto,
  VerifyResetPasswordUserDto,
  VerifyUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserForAdminDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorators';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { RoleUser } from 'src/enums/enums';
import { Request } from 'express';
import { QueryUserDto } from './dto/user-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({
    summary: '👤 Hamma o`zini profilini ko`ra oladi 👤',
    description:
      `Berilgan parametrlar bo‘yicha Hamma o'zini profilini ko'ra oladi`,
  })
  GetMe(@Req() req: Request) {
    return this.userService.Getme(req);
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('create')
  @ApiOperation({
    summary: '📝 Userlarni qo`shish 📝 ',
    description: 'Berilgan parametrlar bo‘yicha userlarni qo`shish',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '🔐 Userlarni login qiladi 🔐',
    description: 'Berilgan parametrlar bo‘yicha userlarni login qlishadi',
  })
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.userService.login(LoginUserDto);
  }

  @Post('sene-otp')
  @ApiOperation({
    summary: '✅ Foydalanuvchilar acountini active qlish uchun code junatadi ✅',
    description:
      'Berilgan parametrlar bo‘yicha Foydalanuvchilar acountini active qlish uchun code junatadi',
  })
  sendOtp(@Body() SendOtpUserDto: SendOtpUserDto) {
    return this.userService.sendOtp(SendOtpUserDto);
  }

  @Post('verify')
  @ApiOperation({
    summary: '✅🔄 Foydalanuvchilar yuborilgan code olib acountini active qlishadi ✅🔄',
    description:
      'Berilgan parametrlar bo‘yicha Foydalanuvchilar yuborilgan code olib acountini active qlishadi',
  })
  verify(@Body() VerifyUserDto: VerifyUserDto) {
    return this.userService.verify(VerifyUserDto);
  }

  @Post('reset-password-otp')
  @ApiOperation({
    summary:
      '🔀✅ Foydalanuvchi Parolni uzgartirmoqchi bulsa agar emailiga code yuborishi kerak 🔀✅',
    description:
      'Berilgan parametrlar bo‘yicha Foydalanuvchi Parolni uzgartirmoqchi bulsa agar emailiga code yuborishi kerak',
  })
  resetPasswordOtp(@Body() SendOtpUserDto: SendOtpUserDto) {
    return this.userService.resetPasswordOtp(SendOtpUserDto);
  }

  @Post('reset-password-verify')
  @ApiOperation({
    summary:
      '🔀✅ Yuborilgan code orqalik yangi paroli b/n code ni kritib update qlishadi 🔀✅',
    description:
      'Berilgan parametrlar bo‘yicha Yuborilgan code orqalik yangi paroli b/n code ni kritib update qlishadi',
  })
  resetPasswordVerify(
    @Body() VerifyResetPasswordUserDto: VerifyResetPasswordUserDto,
  ) {
    return this.userService.resetPasswordVerify(VerifyResetPasswordUserDto);
  }

  @Roles(RoleUser.OWNER, RoleUser.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  @ApiOperation({
    summary: '👥👮🏻‍♂️ Faqat OWNER ko`ra oladi barcha Userlarni 👥👮🏻‍♂️',
    description:
      'Berilgan parametrlar bo‘yicha Faqat OWNER ko`ra oladi barcha Userlarni',
  })
  findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @Roles(RoleUser.ADMIN, RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  @ApiOperation({
    summary: '👥👮🏻‍♂️ Faqat OWNER Userlarni Id si orqalik ko`ra oladi 👥👮🏻‍♂️',
    description:
      'Berilgan parametrlar bo‘yicha Faqat OWNER Userlarni Id si orqalik ko`ra oladi',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '👤 Faqat User o`zini Id si orqalik update qila oladi 👤',
    description:
      'Berilgan parametrlar bo‘yicha Faqat User o`zini Id si orqalik update qila oladi',
  })
  @Patch('for-user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.userService.updateUser(id, UpdateUserDto, req);
  }

  @Roles(RoleUser.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: '👮🏻‍♂️ Faqat OWNER Userlarni Id si orqalik update qila oladi 👮🏻‍♂️',
    description:
      'Berilgan parametrlar bo‘yicha Faqat OWNER Userlarni Id si orqalik update qila oladi',
  })
  @Patch('for-owner/:id')
  update(
    @Param('id') id: string,
    @Body() UpdateUserForAdminDto: UpdateUserForAdminDto,
  ) {
    return this.userService.update(id, UpdateUserForAdminDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '👥👮🏻‍♂️ Faqat OWNER yoki Userni o`zi acoutini Id si orqalik o`chira oladi 👥👮🏻‍♂️',
    description:
      'Berilgan parametrlar bo‘yicha Faqat OWNER Userlarni Id si orqalik o`chira oladi',
  })
  @Delete('logout/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.userService.remove(id, req);
  }
}
