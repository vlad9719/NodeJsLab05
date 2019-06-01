import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from '../database/entities/stock.entity';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Renter } from '../database/entities/renter.entity';
import { RentersService } from '../renters/renters.service';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private readonly stocksRepository: Repository<Stock>,
  ) {}

  async findById(id: number): Promise<Stock> {
    return this.stocksRepository.findOneOrFail(id)
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find stock with id '${id}'`);
        }

        throw new Error(reason);
      });
  }
}
