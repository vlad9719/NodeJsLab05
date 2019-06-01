import { IsNumberString } from 'class-validator';

export class ReportParams {
  @IsNumberString()
  numberOfRequests: number;

  @IsNumberString()
  numberOfRecordsPerRequest: number;
}
