import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()
export class Renter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Contract, contract => contract.renter)
  contracts: Contract[];
}
