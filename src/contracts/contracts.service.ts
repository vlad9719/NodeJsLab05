import { BadRequestException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../database/entities/contract.entity';
import { RentersService } from '../renters/renters.service';
import { StocksService } from '../stocks/stocks.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Stock } from '../database/entities/stock.entity';
import { Renter } from '../database/entities/renter.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: Repository<Contract>,
    private readonly rentersService: RentersService,
    private readonly stocksService: StocksService,
  ) {
  }

  async add(renterId: number, stockId: number, rentalCost: number): Promise<Contract> {
    const renter = await this.rentersService.findById(renterId);
    const stock = await this.stocksService.findById(stockId);

    if (!this.stockHasAvailableCells(stock)) {
      throw new NotAcceptableException(`Stock with id '${stockId}' has no available space`);
    }

    return await this.contractsRepository.save({
      renter,
      stock,
      rentalCost,
      createdAt: new Date(),
    });
  }

  async remove(renterId: number, stockId: number): Promise<Contract> {
    const renter = await this.rentersService.findById(renterId);
    const stock = await this.stocksService.findById(stockId);

    const contract = await this.contractsRepository.findOneOrFail({
      renter,
      stock,
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find contract with renterId '${renterId}' and stockId '${stockId}'`);
        }

        throw new Error(reason);
      });

    return await this.contractsRepository.remove(contract)
      .then(result => {
        return {
          id: contract.id,
          renter,
          stock,
          ...result,
        };
      });
  }

  async getStocksInformationByRenterId(renterId: number): Promise<object> {
    const stockContracts = await this.getAllStocksByRenterId(renterId);
    const totalRentalCost = await this.countTotalRentalCostByRenterId(renterId);

    return {
      stockContracts,
      totalRentalCost,
    };
  }

  async getAllStocksByRenterId(renterId: number): Promise<object[]> {
    const renter = await this.rentersService.findById(renterId);

    const contracts: Contract[] = await this.contractsRepository.find({
      select: ['id', 'createdAt', 'stock', 'rentalCost'],
      where: {
        renter,
      },
      relations: ['stock'],
    });

    return contracts.map(contract => {
      return {
        contractId: contract.id,
        stockId: contract.stock.id,
        stockName: contract.stock.name,
        rentalCost: contract.rentalCost,
        createdAt: contract.createdAt,
      };
    });
  }

  async getAllRentersByStockId(stockId: number): Promise<object[]> {
    const stock = await this.stocksService.findById(stockId);

    const contracts: Contract[] = await this.contractsRepository.find({
      select: ['id', 'createdAt', 'renter', 'rentalCost'],
      where: {
        stock,
      },
      relations: ['renter'],
    });

    return contracts.map(contract => {
      return {
        contractId: contract.id,
        renterId: contract.renter.id,
        renterName: contract.renter.name,
        rentalCost: contract.rentalCost,
        createdAt: contract.createdAt,
      };
    });
  }

  async getNContracts(n: number): Promise<Contract[]> {
    return this.contractsRepository.find({
      take: n,
    });
  }

  async countTotalRentalCostByRenterId(renterId: number): Promise<number> {
    const renter = await this.rentersService.findById(renterId);
    const contracts: Contract[] = await this.contractsRepository.find({
      renter,
    });

    let total: number = 0;

    contracts.forEach(contract => {
      total += contract.rentalCost;
    });

    return total;
  }

  async stockHasAvailableCells(stock: Stock): Promise<boolean> {
    const numberOfCells: number = stock.numberOfCells;

    const rentersOfStock: object[] = await this.getAllRentersByStockId(stock.id);
    const numberOfRentersOfStock: number = rentersOfStock.length;

    return numberOfRentersOfStock < numberOfCells;
  }
}
