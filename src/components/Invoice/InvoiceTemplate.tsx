import React, { useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import QRCode from 'qrcode.react';
import { Edit, Delete, Print, Download, Share } from '@mui/icons-material';
import { Invoice } from '../../interfaces/Invoice';

interface Props {
  invoice: Invoice;
  onEdit?: () => void;
  onDelete?: () => void;
  onSign?: (signature: string) => void;
  onPrint?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const InvoiceTemplate: React.FC<Props> = ({
  invoice,
  onEdit,
  onDelete,
  onSign,
  onPrint,
  onDownload,
  onShare,
}) => {
  const signatureRef = useRef<SignatureCanvas>(null);

  const handleSign = () => {
    if (signatureRef.current && onSign) {
      const signature = signatureRef.current.toDataURL();
      onSign(signature);
    }
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: '800px', margin: 'auto' }}>
      {/* Header Actions */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button startIcon={<Edit />} onClick={onEdit}>
          EDIT
        </Button>
        <Button color="error" startIcon={<Delete />} onClick={onDelete}>
          DEL
        </Button>
      </Box>

      {/* Company Header */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid component="div" item xs={2}>
          <img src={invoice.company.logo} alt="Company Logo" style={{ width: '100%' }} />
        </Grid>
        <Grid component="div" item xs={10}>
          <Typography variant="h4">{invoice.company.name}</Typography>
          <Typography>{invoice.company.address}</Typography>
          <Typography>Mobile: {invoice.company.mobile} GSTIN: {invoice.company.gstin}</Typography>
          <Typography>Email: {invoice.company.email}</Typography>
        </Grid>
      </Grid>

      {/* Invoice Details */}
      <Box mb={3}>
        <Typography variant="h6">TAX INVOICE</Typography>
        <Typography>Invoice No.: {invoice.invoiceNumber}</Typography>
        <Typography>Invoice Date: {invoice.invoiceDate}</Typography>
      </Box>

      {/* Billing Details */}
      <Grid container spacing={4} mb={3}>
        <Grid component="div" item xs={6}>
          <Typography variant="h6">BILL TO</Typography>
          <Typography>{invoice.billTo.name}</Typography>
          <Typography>{invoice.billTo.address}</Typography>
          <Typography>Mobile: {invoice.billTo.mobile}</Typography>
          <Typography>State: {invoice.billTo.state}</Typography>
        </Grid>
        <Grid component="div" item xs={6}>
          <Typography variant="h6">SHIP TO</Typography>
          <Typography>{invoice.shipTo.name}</Typography>
          <Typography>{invoice.shipTo.address}</Typography>
          <Typography>Mobile: {invoice.shipTo.mobile}</Typography>
          <Typography>State: {invoice.shipTo.state}</Typography>
        </Grid>
      </Grid>

      {/* Items Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ITEMS</TableCell>
            <TableCell align="right">QTY.</TableCell>
            <TableCell align="right">RATE</TableCell>
            <TableCell align="right">TAX</TableCell>
            <TableCell align="right">AMOUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.rate.toFixed(2)}</TableCell>
              <TableCell align="right">{item.tax.toFixed(2)}</TableCell>
              <TableCell align="right">{item.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right">
              <strong>Subtotal:</strong>
            </TableCell>
            <TableCell align="right">
              ₹{invoice.subtotal.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} align="right">
              <strong>Discount:</strong>
            </TableCell>
            <TableCell align="right">
              ₹{invoice.discount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Totals and Tax Details */}
      <Grid container spacing={2} mt={3}>
        <Grid component="div" item xs={6}>
          <Typography variant="h6">BANK DETAILS</Typography>
          <Typography>Name: {invoice.bankDetails.name}</Typography>
          <Typography>Account No: {invoice.bankDetails.accountNo}</Typography>
          <Typography>IFSC Code: {invoice.bankDetails.ifscCode}</Typography>
          <Typography>Branch: {invoice.bankDetails.branch}</Typography>
        </Grid>
        <Grid component="div" item xs={6}>
          <Typography>Taxable Amount: ₹{invoice.taxDetails.taxableAmount.toFixed(2)}</Typography>
          <Typography>CGST @14%: ₹{invoice.taxDetails.cgst.toFixed(2)}</Typography>
          <Typography>SGST @14%: ₹{invoice.taxDetails.sgst.toFixed(2)}</Typography>
          <Typography variant="h6">Total Amount: ₹{invoice.totalAmount.toFixed(2)}</Typography>
          <Typography>Amount in words: {invoice.amountInWords}</Typography>
        </Grid>
      </Grid>

      {/* Payment Details */}
      <Grid container spacing={2} mt={3}>
        <Grid component="div" item xs={6}>
          <Typography variant="h6">PAYMENT QR CODE</Typography>
          <QRCode value={invoice.paymentDetails.upiId} size={128} />
          <Typography>UPI ID: {invoice.paymentDetails.upiId}</Typography>
        </Grid>
        <Grid component="div" item xs={6}>
          <Typography>Received Amount: ₹{invoice.paymentDetails.receivedAmount.toFixed(2)}</Typography>
          <Typography>Balance: ₹{invoice.paymentDetails.balance.toFixed(2)}</Typography>
        </Grid>
      </Grid>

      {/* Terms and Signature */}
      <Box mt={3}>
        <Typography variant="h6">TERMS AND CONDITIONS</Typography>
        <Typography>{invoice.termsAndConditions}</Typography>
      </Box>

      {/* E-Signature */}
      <Box mt={3}>
        <Typography variant="h6">AUTHORIZED SIGNATURE</Typography>
        {invoice.signature ? (
          <img src={invoice.signature} alt="Signature" style={{ maxWidth: '200px' }} />
        ) : (
          <Box border="1px solid #ccc" p={1} mt={1}>
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                width: 300,
                height: 150,
                className: 'signature-canvas'
              }}
            />
            <Box mt={1}>
              <Button size="small" onClick={handleSign}>Save Signature</Button>
              <Button size="small" onClick={clearSignature}>Clear</Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Footer Actions */}
      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <IconButton onClick={onPrint} color="primary">
          <Print />
        </IconButton>
        <IconButton onClick={onDownload} color="primary">
          <Download />
        </IconButton>
        <IconButton onClick={onShare} color="primary">
          <Share />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default InvoiceTemplate; 