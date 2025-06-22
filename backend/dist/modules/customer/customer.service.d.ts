import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    create(data: Partial<Customer>): Promise<Customer>;
    findAll(accountId: number): Promise<Customer[]>;
    findOne(id: number, accountId: number): Promise<Customer>;
    update(id: number, data: Partial<Customer>, accountId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, accountId: number): Promise<import("typeorm").DeleteResult>;
}
