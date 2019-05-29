import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contracts } from './entities/contracts.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contracts)
    private readonly contractsRepository: Repository<Contracts>,
  ) {}

  async findByIds(renterId: number, stockId: number): Promise<Contracts> {
    return await this.contractsRepository.findOne( {
      renterId,
      stockId,
    });
  }
}
