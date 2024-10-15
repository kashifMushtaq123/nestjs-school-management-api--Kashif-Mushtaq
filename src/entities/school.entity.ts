import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { Organization } from './organization.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  shift: string;

  @Column({ default: false })
  hasProjector: boolean;

  @Column({ default: false })
  hasLaptop: boolean;

  @ManyToOne(() => Address, { nullable: false })
  @JoinColumn({ name: 'addressId' }) 
  address: Address;

  @ManyToOne(() => Organization, { nullable: false })
  @JoinColumn({ name: 'organizationId' }) 
  organization: Organization;

  
  @Column({ nullable: true })
  addressId: number; 
  @Column({ nullable: true })
  organizationId: number; 
}
