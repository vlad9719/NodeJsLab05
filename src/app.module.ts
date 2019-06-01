import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { ContractsService } from './contracts/contracts.service';
import { ContractsController } from './contracts/contracts.controller';
import { RentersService } from './renters/renters.service';
import { StocksService } from './stocks/stocks.service';
import { ContractsModule } from './contracts/contracts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ContractsModule, AuthModule],
  controllers: [HealthcheckController, ContractsController],
  providers: [ContractsService, RentersService, StocksService],
})

export class AppModule {}
