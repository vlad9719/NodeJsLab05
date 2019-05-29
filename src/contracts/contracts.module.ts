import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contracts } from './entities/contracts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contracts])],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
