import React from 'react';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';

const ViewTransactionModal = ({ transaction, onClose, onEdit }) => {
  if (!transaction) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = Math.abs(amount).toFixed(2);
    return type === 'credit' ? `+$${formattedAmount}` : `-$${formattedAmount}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Transaction Details</h2>
          <button className="action-button" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
        
        <div className="modal-content">
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
            <p className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
              {formatAmount(transaction.amount, transaction.type)}
            </p>
          </div>
          
          <div className="detail-group">
            <label>Status</label>
            <span className={`status-badge ${transaction.status.toLowerCase()}`}>
              {transaction.status}
            </span>
          </div>
          
          <div className="detail-group">
            <label>Date</label>
            <p>{formatDate(transaction.date)}</p>
          </div>
          
          {transaction.description && (
            <div className="detail-group">
              <label>Description</label>
              <p>{transaction.description}</p>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onEdit}>
            <EditIcon fontSize="small" />
            Edit Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionModal; 