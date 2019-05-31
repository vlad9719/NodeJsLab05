import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { ContractsService } from './contracts/contracts.service';
import { ContractsModule } from './contracts/contracts.module';
import { ContractsController } from './contracts/contracts.controller';
import { RentersService } from './contracts/renters/renters.service';
import { StocksService } from './contracts/stocks/stocks.service';

@Module({
  imports: [TypeOrmModule.forRoot(), ContractsModule],
  controllers: [HealthcheckController, ContractsController],
  providers: [ContractsService, RentersService, StocksService],
})

export class AppModule {}
