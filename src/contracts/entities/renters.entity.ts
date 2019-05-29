import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Contracts } from './contracts.entity';

@Entity()
@OneToMany(type => Contracts, contract => contract.renterId)
export class Renters {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
