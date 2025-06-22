import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoice_number: string;

  @Column({ type: 'date' })
  invoice_date: string;

  @Column({ nullable: true })
  original_for: string;

  @Column({ nullable: true })
  bill_to_name: string;

  @Column({ nullable: true })
  bill_to_address: string;

  @Column({ nullable: true })
  bill_to_mobile: string;

  @Column({ nullable: true })
  bill_to_state: string;

  @Column({ nullable: true })
  ship_to_name: string;

  @Column({ nullable: true })
  ship_to_address: string;

  @Column('json')
  items: any;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  cgst: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  sgst: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ nullable: true })
  terms: string;

  @ManyToOne(() => Customer, { nullable: true })
  client: Customer;

  @ManyToOne(() => Account)
  account: Account;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  created_by: string;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  updated_by: string;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({ nullable: true })
  deleted_by: string;
} 