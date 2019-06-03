import { Test, TestingModule } from '@nestjs/testing';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { RentersService } from '../renters/renters.service';
import { StocksService } from '../stocks/stocks.service';
import { Repository } from 'typeorm';

describe('Contracts Controller', () => {
  let contractsController: ContractsController;
  let contractsService: ContractsService;

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
      controllers: [ContractsController],
    }).compile();

    contractsController = module.get<ContractsController>(ContractsController);
    contractsService = module.get<ContractsService>(ContractsService);
  });

  it('should be defined', () => {
    expect(contractsController).toBeDefined();
  });

  it('should be defined', () => {
    expect(contractsService).toBeDefined();
  });
});
