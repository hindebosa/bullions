import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
import { PurchasesService } from './modules/purchases/purchases.service';
import { UserController } from './modules/user/user.controller';

import { PurchasesController } from './modules/purchases/purchases.controller';
import { UserModule } from './modules/user/user.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, PurchasesModule, PrismaModule, HttpModule],
  controllers: [AppController, UserController, PurchasesController],
  providers: [
    AppService,
    UserService,
    PurchasesService,
    PrismaService,
    ConfigService,
  ],
})
export class AppModule {}
