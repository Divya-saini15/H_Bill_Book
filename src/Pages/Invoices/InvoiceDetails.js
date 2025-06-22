import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Edit as EditIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { generateInvoicePDF } from '../../utils/pdfUtils';

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Load invoice from localStorage
    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const foundInvoice = savedInvoices.find(inv => inv.invoiceDetails.number === id);
    
    if (foundInvoice) {
      setInvoice(foundInvoice);
    } else {
      navigate('/invoices');
    }
  }, [id, navigate]);

  const handleDownload = async () => {
    if (!invoice) return;
    
    try {
      setDownloading(true);
      await generateInvoicePDF(invoice);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = async () => {
    if (!invoice) return;
    
    try {
      setDownloading(true);
      await generateInvoicePDF(invoice);
      window.print();
    } catch (error) {
      console.error('Error preparing invoice for print:', error);
      alert('Failed to prepare invoice for printing. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!invoice) return;
    
    try {
      setDownloading(true);
      if (navigator.share) {
        const blob = await generateInvoicePDF(invoice);
        const file = new File([blob], `Invoice-${invoice.invoiceDetails.number}.pdf`, {
          type: 'application/pdf'
        });
        
        await navigator.share({
          title: `Invoice ${invoice.invoiceDetails.number}`,
          text: `Invoice for ${invoice.billTo.name}`,
          files: [file]
        });
      } else {
        await handleDownload();
      }
    } catch (error) {
      console.error('Error sharing invoice:', error);
      if (error.name !== 'AbortError') {
        alert('Failed to share invoice. Please try downloading instead.');
      }
    } finally {
      setDownloading(false);
    }
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-section">
      <div className="page-header">
        <button className="btn btn-link" onClick={() => navigate('/invoices')}>
          <ArrowBackIcon /> Back to Invoices
        </button>
        <h1>Invoice Details</h1>
        <div className="header-actions">
          <button 
            className={`btn btn-primary ${downloading ? 'disabled' : ''}`}
            onClick={() => !downloading && handleDownload()}
            disabled={downloading}
          >
            <DownloadIcon />
            {downloading ? 'Downloading...' : 'Download'}
          </button>
          <button 
            className={`btn btn-secondary ${downloading ? 'disabled' : ''}`}
            onClick={() => !downloading && handlePrint()}
            disabled={downloading}
          >
            <PrintIcon />
            Print
          </button>
          <button 
            className={`btn btn-secondary ${downloading ? 'disabled' : ''}`}
            onClick={() => !downloading && handleShare()}
            disabled={downloading}
          >
            <ShareIcon />
            Share
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/invoices/${id}/edit`)}
          >
            <EditIcon />
            Edit
          </button>
        </div>
      </div>

      <div className="invoice-preview">
        {/* Invoice Preview Content */}
        <div className="company-header">
          <h2>TFS TRADERS</h2>
          <p>shop no.1 achinera road Brij nagar BHARATPUR, bharatpur, Rajasthan, 321001</p>
          <p>Mobile: 9414419941    GSTIN: 08ARQPT1298L1ZS</p>
          <p>Email: tfstraders2021@gmail.com</p>
        </div>

        <div className="invoice-details">
          <div className="invoice-number">
            <h3>TAX INVOICE</h3>
            <p>Invoice No.: {invoice.invoiceDetails.number}</p>
            <p>Date: {new Date(invoice.invoiceDetails.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="address-section">
          <div className="bill-to">
            <h4>BILL TO</h4>
            <p>{invoice.billTo.name}</p>
            <p>{invoice.billTo.address}</p>
            <p>Mobile: {invoice.billTo.mobile}</p>
            <p>State: {invoice.billTo.state}</p>
          </div>
          <div className="ship-to">
            <h4>SHIP TO</h4>
            <p>{invoice.shipTo.name}</p>
            <p>{invoice.shipTo.address}</p>
          </div>
        </div>

        <div className="items-table">
          <table>
            <thead>
              <tr>
                <th>ITEMS</th>
                <th>QTY.</th>
                <th>RATE</th>
                <th>TAX</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.rate.toFixed(2)}</td>
                  <td>{item.tax}%</td>
                  <td>₹{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="totals-section">
          <div className="total-row">
            <span>SUBTOTAL:</span>
            <span>₹{invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>CGST @14%:</span>
            <span>₹{invoice.cgst.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>SGST @14%:</span>
            <span>₹{invoice.sgst.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total">
            <span>TOTAL AMOUNT:</span>
            <span>₹{invoice.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bank-details">
          <h4>BANK DETAILS</h4>
          <p>Name: {invoice.bankDetails?.name || 'TFS TRADERS'}</p>
          <p>IFSC Code: {invoice.bankDetails?.ifsc || 'HDFC0008852'}</p>
          <p>Account No: {invoice.bankDetails?.accountNo || '50200080364460'}</p>
          <p>Bank: {invoice.bankDetails?.bank || 'HDFC Bank,BHARATPUR IV'}</p>
        </div>

        <div className="terms">
          <h4>TERMS AND CONDITIONS</h4>
          <p>{invoice.termsAndConditions || 'use of items not return, only repair in warrenty period as company proposed'}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails; 