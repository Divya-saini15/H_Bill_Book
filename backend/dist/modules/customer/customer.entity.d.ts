import { Account } from '../account/account.entity';
export declare class Customer {
    id: number;
    customer_public_id: string;
    customer_id: string;
    name: string;
    email: string;
    phone: string;
    total_spent: number;
    last_invoice: string;
    status: string;
    account: Account;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted_at: Date;
    deleted_by: string;
}
