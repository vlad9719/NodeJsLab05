import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()

export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  numberOfCells: number;

  @OneToMany(type => Contract, contract => contract.stock)
  contracts: Contract[];
}
