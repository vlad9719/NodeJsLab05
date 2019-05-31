import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from '../entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private readonly stocksRepository: Repository<Stock>,
  ) {}

  async findById(id: number): Promise<Stock> {
    return this.stocksRepository.findOne(id);
  }
}
