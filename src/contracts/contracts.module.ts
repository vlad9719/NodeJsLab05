import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from '../database/entities/contract.entity';
import { Renter } from '../database/entities/renter.entity';
import { Stock } from '../database/entities/stock.entity';
import { HealthcheckController } from '../healthcheck/healthcheck.controller';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { RentersService } from '../renters/renters.service';
import { StocksService } from '../stocks/stocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Renter, Stock])],
  controllers: [HealthcheckController, ContractsController],
  providers: [ContractsService, RentersService, StocksService],
})
export class ContractsModule {}
