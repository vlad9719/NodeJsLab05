import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { RentersService } from './renters/renters.service';
import { StocksService } from './stocks/stocks.service';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: Repository<Contract>,
    private readonly rentersService: RentersService,
    private readonly stocksService: StocksService,
  ) {}

  async add(renterId: number, stockId: number, rentalCost: number): Promise<Contract> {
    const renter = await this.rentersService.findById(renterId);
    const stock = await this.stocksService.findById(stockId);

    return await this.contractsRepository.save( {
      renter,
      stock,
      rentalCost,
      createdAt: new Date(),
    });
  }
}
