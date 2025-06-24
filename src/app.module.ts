import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { PartnersModule } from './partners/partners.module';
import { SalaryModule } from './salary/salary.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, PrismaModule, CategoryModule, PartnersModule, SalaryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
