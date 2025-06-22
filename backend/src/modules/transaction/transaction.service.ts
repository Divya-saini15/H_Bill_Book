import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  create(data: Partial<Transaction>) {
    const transaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(transaction);
  }

  findAll(accountId: number) {
    return this.transactionRepository.find({ where: { account: { id: accountId } } });
  }

  async findOne(id: number, accountId: number) {
    const transaction = await this.transactionRepository.findOne({ where: { id, account: { id: accountId } } });
    if (!transaction) throw new NotFoundException('Transaction not found or access denied');
    return transaction;
  }

  update(id: number, data: Partial<Transaction>, accountId: number) {
    return this.transactionRepository.update({ id, account: { id: accountId } }, data);
  }

  remove(id: number, accountId: number) {
    return this.transactionRepository.delete({ id, account: { id: accountId } });
  }
}
