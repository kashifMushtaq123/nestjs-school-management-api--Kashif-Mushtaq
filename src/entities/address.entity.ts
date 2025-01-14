import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  town: string;

  @Column()
  tehsil: string;

  @Column()
  district: string;

  @Column()
  state: string;
}