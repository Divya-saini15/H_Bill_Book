interface CompanyDetails {
  name: string;
  logo: string;
  address: string;
  mobile: string;
  gstin: string;
  email: string;
}

interface PartyDetails {
  name: string;
  address: string;
  state: string;
  mobile: string;
}

interface ItemDetails {
  name: string;
  description?: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
}

interface BankDetails {
  name: string;
  accountNo: string;
  ifscCode: string;
  branch: string;
}

interface PaymentDetails {
  upiId: string;
  qrCode: string;
  receivedAmount: number;
  balance: number;
}

interface TaxDetails {
  cgst: number;
  sgst: number;
  taxableAmount: number;
  totalTax: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  company: CompanyDetails;
  billTo: PartyDetails;
  shipTo: PartyDetails;
  items: ItemDetails[];
  bankDetails: BankDetails;
  paymentDetails: PaymentDetails;
  taxDetails: TaxDetails;
  subtotal: number;
  discount: number;
  totalAmount: number;
  amountInWords: string;
  termsAndConditions: string;
  signature?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: string;
  updatedAt: string;
} 