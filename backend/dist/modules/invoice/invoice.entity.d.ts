import { Account } from '../account/account.entity';
import { Customer } from '../customer/customer.entity';
export declare class Invoice {
    id: number;
    invoice_number: string;
    invoice_date: string;
    original_for: string;
    bill_to_name: string;
    bill_to_address: string;
    bill_to_mobile: string;
    bill_to_state: string;
    ship_to_name: string;
    ship_to_address: string;
    items: any;
    subtotal: number;
    cgst: number;
    sgst: number;
    total: number;
    terms: string;
    client: Customer;
    account: Account;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted_at: Date;
    deleted_by: string;
}
