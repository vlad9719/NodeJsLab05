import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Renter } from '../entities/renter.entity';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

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
