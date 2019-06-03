import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { Repository } from 'typeorm';

describe('StocksService', () => {
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksService, {
        provide: 'StockRepository',
        useClass: Repository,
      }],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
