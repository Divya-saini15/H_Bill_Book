import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Invoice } from '../../interfaces/Invoice';
import { generateInvoiceNumber, calculateTaxes, convertAmountToWords } from '../../utils/invoiceUtils';

interface Props {
  onSubmit: (invoice: Invoice) => void;
  companyDetails: {
    name: string;
    logo: string;
    address: string;
    mobile: string;
    gstin: string;
    email: string;
  };
}

const CreateInvoiceForm: React.FC<Props> = ({ onSubmit, companyDetails }) => {
  const [billTo, setBillTo] = useState({
    name: '',
    address: '',
    state: '',
    mobile: '',
  });

  const [items, setItems] = useState([{
    name: '',
    description: '',
    quantity: 1,
    rate: 0,
    tax: 0,
    amount: 0,
  }]);

  const [bankDetails, setBankDetails] = useState({
    name: '',
    accountNo: '',
    ifscCode: '',
    branch: '',
  });

  const [discount, setDiscount] = useState(0);

  const [termsAndConditions, setTermsAndConditions] = useState(
    'Use of items not return, only repair in warrenty period as company proposed'
  );

  const handleBillToChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillTo({ ...billTo, [field]: event.target.value });
  };

  const handleItemChange = (index: number, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItems = [...items];
    const value = field === 'quantity' ? parseInt(event.target.value) : parseFloat(event.target.value);
    newItems[index] = {
      ...newItems[index],
      [field]: event.target.value,
    };

    // Calculate amount
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }

    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {
      name: '',
      description: '',
      quantity: 1,
      rate: 0,
      tax: 0,
      amount: 0,
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleBankDetailsChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setBankDetails({ ...bankDetails, [field]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const discountedAmount = subtotal - discount;
    const taxDetails = calculateTaxes(discountedAmount);

    const invoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: new Date().toISOString().split('T')[0],
      company: companyDetails,
      billTo,
      shipTo: billTo, // Using same address for shipping
      items,
      bankDetails,
      paymentDetails: {
        upiId: '', // To be filled by the business
        qrCode: '', // To be generated
        receivedAmount: 0,
        balance: taxDetails.total,
      },
      taxDetails: {
        cgst: taxDetails.cgst,
        sgst: taxDetails.sgst,
        taxableAmount: taxDetails.taxableAmount,
        totalTax: taxDetails.cgst + taxDetails.sgst,
      },
      subtotal,
      discount,
      totalAmount: taxDetails.total,
      amountInWords: convertAmountToWords(taxDetails.total),
      termsAndConditions,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(invoice);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Create New Invoice
        </Typography>

        {/* Bill To Section */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Bill To Details
          </Typography>
          <Grid container spacing={2}>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={billTo.name}
                onChange={handleBillToChange('name')}
                required
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile"
                value={billTo.mobile}
                onChange={handleBillToChange('mobile')}
                required
              />
            </Grid>
            <Grid component="div" item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={billTo.address}
                onChange={handleBillToChange('address')}
                multiline
                rows={2}
                required
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={billTo.state}
                onChange={handleBillToChange('state')}
                required
              />
            </Grid>
          </Grid>
        </Box>

        {/* Items Section */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Items
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={item.name}
                      onChange={handleItemChange(index, 'name')}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={item.description}
                      onChange={handleItemChange(index, 'description')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={handleItemChange(index, 'quantity')}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.rate}
                      onChange={handleItemChange(index, 'rate')}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    {item.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            startIcon={<AddIcon />}
            onClick={addItem}
            sx={{ mt: 2 }}
          >
            Add Item
          </Button>
        </Box>

        {/* Add Discount field after Items section */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Discount
          </Typography>
          <TextField
            type="number"
            label="Discount Amount"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            InputProps={{
              startAdornment: <span>₹</span>,
            }}
          />
        </Box>

        {/* Bank Details Section */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Bank Details
          </Typography>
          <Grid container spacing={2}>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                value={bankDetails.name}
                onChange={handleBankDetailsChange('name')}
                required
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={bankDetails.accountNo}
                onChange={handleBankDetailsChange('accountNo')}
                required
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                value={bankDetails.ifscCode}
                onChange={handleBankDetailsChange('ifscCode')}
                required
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Branch"
                value={bankDetails.branch}
                onChange={handleBankDetailsChange('branch')}
                required
              />
            </Grid>
          </Grid>
        </Box>

        {/* Terms and Conditions */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Terms and Conditions
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Generate Invoice
        </Button>
      </form>
    </Paper>
  );
};

export default CreateInvoiceForm; 