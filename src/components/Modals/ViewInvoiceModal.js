import React from 'react';
import Modal from './Modal';

const ViewInvoiceModal = ({ show, onClose, invoice }) => {
  if (!invoice) {
    return null;
  }

  const invoiceId = invoice.invoiceDetails?.number || invoice.id;
  const invoiceDate = invoice.invoiceDetails?.date || invoice.date;
  const clientName = invoice.billTo?.name || invoice.client;
  const amount = invoice.total ? `₹${invoice.total.toFixed(2)}` : invoice.amount;
  const status = invoice.status || 'N/A';

  return (
    <Modal show={show} onClose={onClose} title={`Invoice #${invoiceId}`}>
      <div className="invoice-details">
        <p><strong>Client:</strong> {clientName}</p>
        <p><strong>Date:</strong> {new Date(invoiceDate).toLocaleDateString()}</p>
        <p><strong>Amount:</strong> {amount}</p>
        <p><strong>Status:</strong> <span className={`status-badge ${status.toLowerCase()}`}>{status}</span></p>
      </div>
    </Modal>
  );
};

export default ViewInvoiceModal;