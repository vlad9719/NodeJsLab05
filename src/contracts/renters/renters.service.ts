import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Renter } from '../entities/renter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RentersService {
  constructor(
    @InjectRepository(Renter)
    private readonly rentersRepository: Repository<Renter>,
  ) {}

  async findById(id: number): Promise<Renter> {
    return this.rentersRepository.findOne(id);
  }
}
