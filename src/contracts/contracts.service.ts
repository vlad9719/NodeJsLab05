import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { RentersService } from './renters/renters.service';
import { StocksService } from './stocks/stocks.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: Repository<Contract>,
    private readonly rentersService: RentersService,
    private readonly stocksService: StocksService,
  ) {
  }

  async add(renterId: number, stockId: number, rentalCost: number): Promise<Contract> {
    const renter = await this.rentersService.findById(renterId);
    const stock = await this.stocksService.findById(stockId);

    return await this.contractsRepository.save({
      renter,
      stock,
      rentalCost,
      createdAt: new Date(),
    });
  }

  async remove(renterId: number, stockId: number): Promise<Contract> {
    const renter = await this.rentersService.findById(renterId);
    const stock = await this.stocksService.findById(stockId);

    const contract = await this.contractsRepository.findOneOrFail({
      renter,
      stock,
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find contract with renterId '${renterId}' and stockId '${stockId}'`);
        }

        throw new Error(reason);
      });

    return await this.contractsRepository.remove(contract)
      .then( result => {
        return {
          id: contract.id,
          renter,
          stock,
          ...result,
        };
      });
  }
}
