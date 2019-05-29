import { Controller, Get, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Contracts } from './entities/contracts.entity';

@Controller('api/contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get(':renterId/:stockId')
  findById(@Param('renterId') renterId, @Param('stockId') stockId): Promise<Contracts> {
    return this.contractsService.findByIds(renterId, stockId);
  }
}
