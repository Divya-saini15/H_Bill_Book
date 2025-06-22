import React, { useState } from 'react';
import { 
  FiSearch, 
  FiEye, 
  FiEdit2, 
  FiTrash2, 
  FiCopy, 
  FiDownload,
  FiPlayCircle
} from 'react-icons/fi';
import ViewInvoiceModal from '../components/Modals/ViewInvoiceModal';
import { generateInvoicePDF } from '../utils/pdfGenerator';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-282574',
      date: '6/6/2025',
      client: 'Divya',
      amount: '$200440.00',
      status: 'Pending',
      // Added detailed invoice data
      invoiceNumber: 'TS/SL/24-25/191',
      invoiceDate: '04/05/2025',
      billTo: {
        name: 'Yaspal Ji Raj Hotels Saras',
        address: 'saras choraha bharatpur Rajasthan, bharatpur',
        mobile: '9829721802',
        state: 'Rajasthan'
      },
      shipTo: {
        name: 'Yaspal Ji Raj Hotels Saras',
        address: 'saras choraha bharatpur Rajasthan, bharatpur'
      },
      company: {
        name: 'TFS TRADERS',
        address: 'shop no.1 achhimera road Big nagar BHARATPUR, bharatpur, Rajasthan, 321001',
        mobile: '9414419941',
        gstin: '08AQPPT1298L1ZS',
        email: 'tfstraders2021@gmail.com'
      },
      items: [
        {
          description: 'GLS191SKVASF',
          serialNumber: 'S.No-CUT+ AB70DG0KQT6/K68',
          quantity: 1,
          rate: 30468.75,
          tax: 8531.25,
          taxRate: 28,
          amount: 39000
        }
      ],
      subtotal: 8531.25,
      totalAmount: 39000,
      taxableAmount: 30468.75,
      cgst: 4265.63,
      sgst: 4265.63,
      amountInWords: 'Thirty Nine Thousand Rupees',
      bankDetails: {
        name: 'TFS TRADERS',
        ifsc: 'HDFC0008352',
        accountNo: '50200080364460',
        bank: 'HDFC Bank BHARATPUR IV'
      },
      terms: 'use of items not return, only repair in warrenty period as company proposed'
    },
    {
      id: 'INV-994099',
      date: '8/19/2012',
      client: 'Dolor mollit qui conNesciunt exercitati',
      amount: '$70625.60',
      status: 'Pending',
      // Sample data for second invoice
      invoiceNumber: 'TS/SL/12-13/099',
      invoiceDate: '19/08/2012',
      billTo: {
        name: 'Dolor mollit qui conNesciunt exercitati',
        address: 'Sample Address, City, State',
        mobile: '1234567890',
        state: 'Sample State'
      },
      shipTo: {
        name: 'Dolor mollit qui conNesciunt exercitati',
        address: 'Sample Address, City, State'
      },
      company: {
        name: 'TFS TRADERS',
        address: 'shop no.1 achhimera road Big nagar BHARATPUR, bharatpur, Rajasthan, 321001',
        mobile: '9414419941',
        gstin: '08AQPPT1298L1ZS',
        email: 'tfstraders2021@gmail.com'
      },
      items: [
        {
          description: 'Sample Product',
          serialNumber: 'S.No-SAMPLE123',
          quantity: 2,
          rate: 25000,
          tax: 14000,
          taxRate: 28,
          amount: 64000
        }
      ],
      subtotal: 50000,
      totalAmount: 70625.60,
      taxableAmount: 50000,
      cgst: 7000,
      sgst: 7000,
      amountInWords: 'Seventy Thousand Six Hundred Twenty Five Rupees Sixty Paisa',
      bankDetails: {
        name: 'TFS TRADERS',
        ifsc: 'HDFC0008352',
        accountNo: '50200080364460',
        bank: 'HDFC Bank BHARATPUR IV'
      },
      terms: 'use of items not return, only repair in warrenty period as company proposed'
    }
  ]);

  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewInvoice = (invoice) => {
    setViewingInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleDownloadInvoice = (invoice) => {
    generateInvoicePDF(invoice);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Invoices</h1>
        <button className="btn btn-primary">+ Create Invoice</button>
      </div>

      <div className="filters-container" style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="search-input"
          />
        </div>

        <button className="btn btn-secondary">
          <FiSearch /> Filters
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input type="checkbox" />
              </th>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{invoice.id}</td>
                <td>{invoice.date}</td>
                <td>{invoice.client}</td>
                <td>{invoice.amount}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-button" 
                      title="View"
                      onClick={() => handleViewInvoice(invoice)}
                    >
                      <FiEye />
                    </button>
                    <button className="action-button" title="Edit">
                      <FiEdit2 />
                    </button>
                    <button className="action-button" title="Duplicate">
                      <FiCopy />
                    </button>
                    <button 
                      className="action-button" 
                      title="Download"
                      onClick={() => handleDownloadInvoice(invoice)}
                    >
                      <FiDownload />
                    </button>
                    <button className="action-button" title="Send">
                      <FiPlayCircle />
                    </button>
                    <button className="action-button" title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewInvoiceModal
        show={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        invoice={viewingInvoice}
      />
    </div>
  );
};

export default InvoicesPage;