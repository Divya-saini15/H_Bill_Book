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
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  transaction_public_id: string;

  @Column()
  transaction_id: string;

  @Column()
  customer: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  status: string;

  @Column({ type: 'date' })
  date: string;

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