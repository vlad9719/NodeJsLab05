import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Renter } from './renter.entity';
import { Stock } from './stock.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Renter, renter => renter.contracts)
  renter: Renter;

  @ManyToOne(type => Stock, stock => stock.contracts)
  stock: Stock;

  @Column()
  rentalCost: number;

  @Column()
  createdAt: Date;
}
