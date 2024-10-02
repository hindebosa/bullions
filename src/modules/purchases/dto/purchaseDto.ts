import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class PurchaseDto {
  @IsNotEmpty()
  @IsUUID()
  userID: string;

  @IsNotEmpty()
  @IsNumber()
  currencyAvailable: number;
}
