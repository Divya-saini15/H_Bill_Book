import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(body: any, req: any): Promise<import("./transaction.entity").Transaction>;
    findAll(req: any): Promise<import("./transaction.entity").Transaction[]>;
    findOne(id: string, req: any): Promise<import("./transaction.entity").Transaction>;
    update(id: string, body: any, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
}
