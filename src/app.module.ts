import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { ContractsService } from './contracts/contracts.service';
import { ContractsModule } from './contracts/contracts.module';
import { ContractsController } from './contracts/contracts.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), ContractsModule],
  controllers: [AppController, HealthcheckController, ContractsController],
  providers: [AppService, ContractsService],
})

export class AppModule {}
