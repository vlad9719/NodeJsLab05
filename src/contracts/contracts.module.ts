import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { RentersService } from './renters/renters.service';
import { StocksService } from './stocks/stocks.service';
import { Renter } from './entities/renter.entity';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Renter, Stock])],
  providers: [ContractsService, RentersService, StocksService],
  controllers: [ContractsController],
})
export class ContractsModule {}
