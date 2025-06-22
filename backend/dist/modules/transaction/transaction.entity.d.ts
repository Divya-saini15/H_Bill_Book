import { Account } from '../account/account.entity';
export declare class Transaction {
    id: number;
    transaction_public_id: string;
    transaction_id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
    account: Account;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted_at: Date;
    deleted_by: string;
}
