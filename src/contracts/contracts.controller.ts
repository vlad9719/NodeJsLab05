import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './validation/dto/contract.dto';
import { ContractParams } from './validation/contract.params';

@Controller('/api/contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {
  }

  @Post(':renterId/:stockId')
  add(@Param() params: ContractParams, @Body() createContractDto: CreateContractDto): object {
    return this.contractsService.add(params.renterId, params.stockId, createContractDto.rentalCost)
      .then(result => {
        return {
          addedContract: result,
        };
      });
  }

  @Delete(':renterId/:stockId')
  remove(@Param() params: ContractParams): object {
    return this.contractsService.remove(params.renterId, params.stockId)
      .then(result => {
        return {
          removedContract: result,
        };
      });
  }
}
