import { IsNumberString } from 'class-validator';

export class StockParams {
  @IsNumberString()
  stockId: number;
}
