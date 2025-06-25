import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { PartnersModule } from './partners/partners.module';
import { SalaryModule } from './salary/salary.module';
import { ProductModule } from './product/product.module';
import { ContractModule } from './contract/contract.module';
import { PaymentModule } from './payment/payment.module';
import { ReturnModule } from './return/return.module';
import { BuyModule } from './buy/buy.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, PrismaModule, CategoryModule, PartnersModule, SalaryModule, ProductModule, ContractModule, PaymentModule, ReturnModule, BuyModule, MailModule, UploadModule],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
