import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Renter } from '../database/entities/renter.entity';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { StocksService } from '../stocks/stocks.service';
import { ContractsService } from '../contracts/contracts.service';
import { Contract } from '../database/entities/contract.entity';
import { Stock } from '../database/entities/stock.entity';

@Injectable()
export class RentersService {
  constructor(
    @InjectRepository(Renter)
    private readonly rentersRepository: Repository<Renter>,
  ) {}

  async findById(id: number): Promise<Renter> {
    return this.rentersRepository.findOneOrFail(id)
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find renter with id '${id}'`);
        }

        throw new Error(reason);
      });
  }
}
