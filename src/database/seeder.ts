import { createConnection } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { Renter } from './entities/renter.entity';
import { Stock } from './entities/stock.entity';
import faker = require('faker');

const DEFAULT_NUMBER_OF_RECORDS: number = 1000;

const cliArguments = process.argv;
const numberOfRecords: number = cliArguments[2] ? +cliArguments[2] : DEFAULT_NUMBER_OF_RECORDS;

seed()
  .then(() => {
    console.log('Database seeded');
    process.exit();
  })
  .catch(error => {
    console.error('Database is not seeded. Error ' + error);
    throw error;
    process.exit();
  });

async function seed() {
  const connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'contracts',
    entities: ['../contracts/entities/*.entity.ts'],
    synchronize: true,
  });

  for (let i: number = 0; i < numberOfRecords; i++) {
    const renter: Renter = new Renter();
    const stock: Stock = new Stock();
    const contract: Contract = new Contract();

    renter.name = faker.name.firstName();
    await connection.manager.save(renter)
      .then(() => {
        stock.name = faker.commerce.department();
        stock.numberOfCells = Math.round(faker.random.number(1000));
        return connection.manager.save(stock);
      })
      .then(() => {
        contract.renter = renter;
        contract.stock = stock;
        contract.createdAt = faker.date.past();
        contract.rentalCost = faker.random.number(10000);
        connection.manager.save(contract);
      })
      .catch(error => {
        throw error;
      });
  }
}
