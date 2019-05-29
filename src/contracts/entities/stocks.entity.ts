import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contracts } from './contracts.entity';

@Entity()
@OneToMany(type => Contracts, contract => contract.stockId)
export class Stocks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  numberOfCells: number;
}
