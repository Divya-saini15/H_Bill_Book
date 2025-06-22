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

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  customer_public_id: string;

  @Column({ unique: true })
  customer_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total_spent: number;

  @Column({ type: 'date', nullable: true })
  last_invoice: string;

  @Column({ default: 'Active' })
  status: string;

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