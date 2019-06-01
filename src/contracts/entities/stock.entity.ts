import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()

export class Stock {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  name: string;

  @Column()
  numberOfCells: number;

  @OneToMany(type => Contract, contract => contract.stock)
  contracts: Contract[];
}
