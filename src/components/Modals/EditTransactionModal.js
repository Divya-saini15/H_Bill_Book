import React, { useState, useEffect } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';

const EditTransactionModal = ({ transaction, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    type: 'credit',
    description: ''
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        customer: transaction.customer || '',
        amount: transaction.amount || '',
        status: transaction.status || 'pending',
        date: transaction.date || new Date().toISOString().split('T')[0],
        type: transaction.type || 'credit',
        description: transaction.description || ''
      });
    }
  }, [transaction]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.customer && formData.amount) {
      onSave({
        ...formData,
        id: transaction?.id,
        amount: parseFloat(formData.amount)
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{transaction ? 'Edit Transaction' : 'New Transaction'}</h2>
          <button className="action-button" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            {transaction && (
              <div className="form-group">
                <label className="form-label">Transaction ID</label>
                <input
                  type="text"
                  value={transaction.id}
                  disabled
                  className="form-input disabled"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => handleInputChange('customer', e.target.value)}
                className="form-input"
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Amount</label>
              <div className="amount-input">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="form-input"
                required
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="form-input"
                required
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="form-input"
                placeholder="Enter transaction description"
                rows="3"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!formData.customer || !formData.amount}
            >
              {transaction ? 'Save Changes' : 'Create Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal; 