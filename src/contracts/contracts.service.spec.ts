import { Test, TestingModule } from '@nestjs/testing';
import { ContractsService } from './contracts.service';
import { Repository } from 'typeorm';
import { RentersService } from '../renters/renters.service';
import { StocksService } from '../stocks/stocks.service';

describe('ContractsService', () => {
  let contractService: ContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractsService, RentersService, StocksService, {
        provide: 'ContractRepository',
        useClass: Repository,
      },
        {
          provide: 'RenterRepository',
          useClass: Repository,
        },
        {
          provide: 'StockRepository',
          useClass: Repository,
        },
        ],
    }).compile();

    contractService = module.get<ContractsService>(ContractsService);
  });

  it('should be defined', () => {
    expect(contractService).toBeDefined();
  });
});
