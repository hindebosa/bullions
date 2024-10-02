import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PurchaseDto } from './dto/purchaseDto';
import { HttpService } from '@nestjs/axios';

interface MetalPriceApiResponse {
  data: {
    success: boolean;
    timestamp: number;
    date: string;
    base: string;
    rates: {
      USD: number;
      XAU: number;
      USDXAU: number;
    };
    unit: {
      XAU: string;
    };
  };
}

@Injectable()
export class PurchasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getPurchases() {
    return this.prisma.purchase.findMany();
  }
  async getLatestMetalPrices(purchaseDto: PurchaseDto) {
    console.log(purchaseDto);
    const apiKey = process.env.METAL_API_KEY; // Store your API key in an environment variable
    const url = `https://commodities-api.com/api/latest?access_key=${apiKey}&base=USD&symbols=XAU`;

    try {
      const userInDB = await this.prisma.user.findUnique({
        where: { id: purchaseDto.userID },
      });
      if (!userInDB) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const response = await firstValueFrom(this.httpService.get(url));

      const tenOuncesGoldPrice = response.data.data.rates.XAU * 10;

      if (tenOuncesGoldPrice < purchaseDto.currencyAvailable) {
        console.log(purchaseDto.currencyAvailable);
        const ouncesPurchased =
          purchaseDto.currencyAvailable / tenOuncesGoldPrice;

        return this.prisma.purchase.create({
          data: {
            userID: purchaseDto.userID,
            ouncesPurchased: ouncesPurchased,
            valueUSD: purchaseDto.currencyAvailable,
            purchaseTime: new Date(),
          },
        });
      }

      if (tenOuncesGoldPrice > purchaseDto.currencyAvailable) {
        throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        throw new HttpException(
          error.response.data.error.message,
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(error);
      throw new HttpException(
        'Failed to fetch metal prices',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
