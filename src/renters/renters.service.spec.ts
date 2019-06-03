import { Test, TestingModule } from '@nestjs/testing';
import { RentersService } from './renters.service';
import { Repository } from 'typeorm';
import { Renter } from '../database/entities/renter.entity';

describe('RentersService', () => {
  let service: RentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentersService, {
        provide: 'RenterRepository',
        useClass: Repository,
      }],
    }).compile();

    service = module.get<RentersService>(RentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
