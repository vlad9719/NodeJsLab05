import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContractDto {
  @IsNumber()
  @IsNotEmpty()
  readonly rentalCost: number;
}
