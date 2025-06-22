import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';

const ViewTransactionModal = ({ transaction, onClose, onEdit }) => {
  if (!transaction) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
    >
      <div 
        className="modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Transaction Details</h2>
          <button className="close-button" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <div className="modal-content">
          <div className="transaction-details">
            <div className="detail-group">
              <label>Transaction ID</label>
              <p>{transaction.id}</p>
            </div>
            
            <div className="detail-group">
              <label>Customer</label>
              <p>{transaction.customer}</p>
            </div>
            
            <div className="detail-group">
              <label>Amount</label>
              <p className="amount">{transaction.amount}</p>
            </div>
            
            <div className="detail-group">
              <label>Status</label>
              <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                {transaction.status}
              </span>
            </div>
            
            <div className="detail-group">
              <label>Date</label>
              <p>{transaction.date}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => onEdit(transaction)}>
            Edit Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionModal; 