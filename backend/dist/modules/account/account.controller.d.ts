import { AccountService } from './account.service';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    create(body: any): Promise<import("./account.entity").Account>;
    findAll(): Promise<import("./account.entity").Account[]>;
    findOne(id: string): Promise<import("./account.entity").Account | null>;
    update(id: string, body: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
