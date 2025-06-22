import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
export declare class InvoiceService {
    private invoiceRepository;
    constructor(invoiceRepository: Repository<Invoice>);
    create(data: Partial<Invoice>): Promise<Invoice>;
    findAll(accountId: number): Promise<Invoice[]>;
    findOne(id: number, accountId: number): Promise<Invoice>;
    update(id: number, data: Partial<Invoice>, accountId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, accountId: number): Promise<import("typeorm").DeleteResult>;
}
