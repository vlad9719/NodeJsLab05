import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Renter } from './renter.entity';
import { Stock } from './stock.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Renter, renter => renter.contracts)
  @Index()
  renter: Renter;

  @ManyToOne(type => Stock, stock => stock.contracts)
  @Index()
  stock: Stock;

  @Column()
  rentalCost: number;

  @Column()
  createdAt: Date;
}
