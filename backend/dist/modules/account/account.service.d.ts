import { Repository } from 'typeorm';
import { Account } from './account.entity';
export declare class AccountService {
    private accountRepository;
    constructor(accountRepository: Repository<Account>);
    create(data: Partial<Account>): Promise<Account>;
    findAll(): Promise<Account[]>;
    findOne(id: number): Promise<Account | null>;
    update(id: number, data: Partial<Account>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
