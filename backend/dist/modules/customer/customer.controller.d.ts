import { CustomerService } from './customer.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(body: any, req: any): Promise<import("./customer.entity").Customer>;
    findAll(req: any): Promise<import("./customer.entity").Customer[]>;
    findOne(id: string, req: any): Promise<import("./customer.entity").Customer>;
    update(id: string, body: any, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
}
