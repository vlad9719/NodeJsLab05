import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './validation/dto/contract.dto';
import { ContractParams } from './validation/contract.params';
import { RenterParams } from './validation/renter.params';
import { StockParams } from './validation/stock.params';
import { RecordsParams } from './validation/records.params';
import { ReportParams } from './validation/report.params';

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
  getStocksByRenter(@Param() params: RenterParams): object {
    return this.contractsService.getStocksInformationByRenterId(params.renterId);
  }

  @Get('/renters/:stockId')
  getRentersByStock(@Param() params: StockParams): object {
    return this.contractsService.getAllRentersByStockId(params.stockId)
      .then(result => {
        return {
          renterContracts: result,
        };
      });
  }

  @Get('/records/:recordsNumber')
  getNRecords(@Param() params: RecordsParams): object {
    return this.contractsService.getNContracts(params.recordsNumber);
  }

  @Get('/average-time-report/:numberOfRequests/:numberOfRecordsPerRequest')
  getAverageRequestTimeReport(@Param() params: ReportParams): object {
    return this.contractsService.getAverageOfNRequestsForMRecords(params.numberOfRequests, params.numberOfRecordsPerRequest);
  }
}
