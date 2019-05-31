import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './validation/dto/contract.dto';
import { ContractParams } from './validation/contract.params';

@Controller('/api/contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post(':renterId/:stockId')
  add(@Param() params: ContractParams, @Body() createContractDto: CreateContractDto): Promise<Contract> {
    return this.contractsService.add(params.renterId, params.stockId, createContractDto.rentalCost);
  }
}
