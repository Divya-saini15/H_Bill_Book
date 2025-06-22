import { InvoiceService } from './invoice.service';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    create(body: any, req: any): Promise<import("./invoice.entity").Invoice>;
    findAll(req: any): Promise<import("./invoice.entity").Invoice[]>;
    findOne(id: string, req: any): Promise<import("./invoice.entity").Invoice>;
    update(id: string, body: any, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<import("typeorm").DeleteResult>;
}
