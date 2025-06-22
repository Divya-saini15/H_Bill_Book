import React from 'react';
import Modal from './Modal';
import { FiMail, FiPhone } from 'react-icons/fi';

const ViewCustomerModal = ({ show, onClose, customer }) => {
  if (!customer) {
    return null;
  }

  return (
    <Modal show={show} onClose={onClose} title="Customer Details">
      <div className="customer-details">
        <p><strong>Customer ID:</strong> {customer.id}</p>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> <FiMail /> {customer.email}</p>
        <p><strong>Phone:</strong> <FiPhone /> {customer.phone}</p>
        <p><strong>Total Spent:</strong> {customer.totalSpent}</p>
        <p><strong>Last Invoice:</strong> {customer.lastInvoice}</p>
        <p><strong>Status:</strong> <span className={`status-badge ${customer.status.toLowerCase()}`}>{customer.status}</span></p>
      </div>
    </Modal>
  );
};

export default ViewCustomerModal; 