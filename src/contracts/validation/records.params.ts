import { IsNumberString } from 'class-validator';

export class RecordsParams {
  @IsNumberString()
  recordsNumber: number;
}
