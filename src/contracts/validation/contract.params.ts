import { IsNumberString } from 'class-validator';

export class ContractParams {
  @IsNumberString()
  renterId: number;

  @IsNumberString()
  stockId: number;
}
