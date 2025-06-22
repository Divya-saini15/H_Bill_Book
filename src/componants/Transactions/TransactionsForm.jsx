import React, { useState, useEffect } from 'react';
import { 
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  LocalOffer as TagIcon,
  Person as PersonIcon,
  AccountBalance as AccountIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  Close as CloseIcon 
} from '@mui/icons-material';

const TransactionForm = ({ isOpen, onClose, transaction = null, onSave }) => {
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    phone: '',
    amount: '',
    type: 'payment',
    status: 'pending',
    description: '',
    date: new Date().toISOString().split('T')[0],
    reference: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [customers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' },
    { id: '5', name: 'David Brown', email: 'david@example.com' }
  ]);

  useEffect(() => {
    if (transaction) {
      setFormData({
        customer: transaction.customer || '',
        email: transaction.email || '',
        phone: transaction.phone || '',
        amount: transaction.amount?.toString() || '',
        type: transaction.type || 'payment',
        status: transaction.status || 'pending',
        description: transaction.description || '',
        date: transaction.date || new Date().toISOString().split('T')[0],
        reference: transaction.reference || ''
      });
    } else {
      // Generate reference for new transaction
      setFormData(prev => ({
        ...prev,
        reference: `TXN${Date.now().toString().slice(-6)}`
      }));
    }
  }, [transaction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCustomerSelect = (e) => {
    const selectedCustomer = customers.find(c => c.name === e.target.value);
    if (selectedCustomer) {
      setFormData(prev => ({
        ...prev,
        customer: selectedCustomer.name,
        email: selectedCustomer.email
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer.trim()) {
      newErrors.customer = 'Customer name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        id: transaction?.id || `${Date.now()}`.slice(-3),
        createdAt: new Date().toISOString()
      };
      
      onSave(transactionData);
      onClose();
      
      // Reset form for new transactions
      if (!transaction) {
        setFormData({
          customer: '',
          email: '',
          phone: '',
          amount: '',
          type: 'payment',
          status: 'pending',
          description: '',
          date: new Date().toISOString().split('T')[0],
          reference: `TXN${Date.now().toString().slice(-6)}`
        });
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {transaction ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-sections">
            {/* Customer Information */}
            <div className="form-section">
              <h3 className="section-title">
                <PersonIcon fontSize="small" />
                Customer Information
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Customer Name *</label>
                  <input
                    type="text"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    list="customers"
                    className={`form-input ${errors.customer ? 'form-input--error' : ''}`}
                    placeholder="Enter or select customer"
                  />
                  <datalist id="customers">
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.name} />
                    ))}
                  </datalist>
                  {errors.customer && <span className="form-error">{errors.customer}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <div className="input-with-icon">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      placeholder="customer@example.com"
                    />
                  </div>
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-with-icon">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="form-section">
              <h3 className="section-title">
                <MoneyIcon fontSize="small" />
                Transaction Details
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Amount *</label>
                  <div className="input-with-icon">
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className={`form-input ${errors.amount ? 'form-input--error' : ''}`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.amount && <span className="form-error">{errors.amount}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="payment">Payment</option>
                    <option value="refund">Refund</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <div className="input-with-icon">
                    <CalendarIcon fontSize="small" className="input-icon" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`form-input ${errors.date ? 'form-input--error' : ''}`}
                    />
                  </div>
                  {errors.date && <span className="form-error">{errors.date}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Reference Number</label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Auto-generated"
                  readOnly={!transaction}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <div className="input-with-icon">
                  <DescriptionIcon fontSize="small" className="input-icon input-icon--textarea" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="form-input form-textarea"
                    placeholder="Optional transaction description..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn--secondary"
              disabled={loading}
            >
              <CloseIcon fontSize="small" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner" />
                  Saving...
                </>
              ) : (
                <>
                  <SaveIcon fontSize="small" />
                  {transaction ? 'Update Transaction' : 'Create Transaction'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;