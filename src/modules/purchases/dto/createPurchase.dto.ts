import { IsString, IsNumber, Min } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  UserID: string;

  @IsNumber()
  @Min(0)
  ouncesPurchased: number;

  @IsNumber()
  @Min(0)
  valueUSD: number;
}
