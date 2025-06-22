import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
export declare class TransactionService {
    private transactionRepository;
    constructor(transactionRepository: Repository<Transaction>);
    create(data: Partial<Transaction>): Promise<Transaction>;
    findAll(accountId: number): Promise<Transaction[]>;
    findOne(id: number, accountId: number): Promise<Transaction>;
    update(id: number, data: Partial<Transaction>, accountId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, accountId: number): Promise<import("typeorm").DeleteResult>;
}
