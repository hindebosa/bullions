import { Body, Controller, Get, Post } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseDto } from './dto/purchaseDto';

@Controller('/api/')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post('gold/purchase')
  async getPurchases(@Body() purchaseData: PurchaseDto) {
    return this.purchasesService.getLatestMetalPrices(purchaseData);
  }
}
