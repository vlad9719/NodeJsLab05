import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './validation/dto/contract.dto';
import { ContractParams } from './validation/contract.params';

@Controller('/api')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {
  }

  @Post('/contracts/:renterId/:stockId')
  add(@Param() params: ContractParams, @Body() createContractDto: CreateContractDto): object {
    return this.contractsService.add(params.renterId, params.stockId, createContractDto.rentalCost)
      .then(result => {
        return {
          addedContract: result,
        };
      });
  }

  @Delete('/contracts/:renterId/:stockId')
  remove(@Param() params: ContractParams): object {
    return this.contractsService.remove(params.renterId, params.stockId)
      .then(result => {
        return {
          removedContract: result,
        };
      });
  }

  @Get('/stocks/:renterId')
  getStocksByRenter(@Param() params): object {
    return this.contractsService.getStocksInformationByRenterId(params.renterId);
  }
}
