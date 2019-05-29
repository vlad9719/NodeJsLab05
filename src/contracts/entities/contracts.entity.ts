import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Renters } from './renters.entity';
import { Stocks } from './stocks.entity';

@Entity()
export class Contracts {
  @PrimaryColumn()
  @ManyToOne(type => Renters, renter => renter.id)
  renterId: number;

  @PrimaryColumn()
  @ManyToOne(type => Stocks, stock => stock.id)
  stockId: number;

  @Column()
  rentalCost: number;

  @Column()
  createdAt: Date;
}
