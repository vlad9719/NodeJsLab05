import { IsNumberString } from 'class-validator';

export class RenterParams {
  @IsNumberString()
  renterId: number;
}
