import React, { useState } from 'react';
import { 
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  LocalOffer as TagIcon,
  Person as PersonIcon,
  AccountBalance as AccountIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';

const TransactionDetail = ({ isOpen, onClose, transaction, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');

  if (!isOpen || !transaction) return null;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle className="status-icon" />;
      case 'pending': return <Clock className="status-icon" />;
      case 'failed': return <XCircle className="status-icon" />;
      case 'cancelled': return <AlertTriangle className="status-icon" />;
      default: return <Clock className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'status--success';
      case 'pending': return 'status--pending';
      case 'failed': return 'status--failed';
      case 'cancelled': return 'status--warning';
      default: return 'status--pending';
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDownload = () => {
    // Generate receipt or export transaction data
    const dataStr = JSON.stringify(transaction, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `transaction-${transaction.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="transaction-detail">
      <div className="detail-header">
        <button className="btn btn-link" onClick={onClose}>
          <ArrowBackIcon fontSize="small" />
          Back
        </button>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => onEdit && onEdit(transaction)}>
            <EditIcon fontSize="small" />
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onEdit && onEdit(transaction)}>
            <DeleteIcon fontSize="small" />
            Delete
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>
            <CalendarIcon fontSize="small" />
            Date
          </h3>
          <p>{new Date(transaction.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div className="detail-section">
          <h3>
            <MoneyIcon fontSize="small" />
            Amount
          </h3>
          <p>${transaction.amount}</p>
        </div>

        <div className="detail-section">
          <h3>
            <DescriptionIcon fontSize="small" />
            Description
          </h3>
          <p>{transaction.description}</p>
        </div>

        <div className="detail-section">
          <h3>
            <TagIcon fontSize="small" />
            Category
          </h3>
          <p>{transaction.category || 'General Purchase'}</p>
        </div>

        <div className="detail-section">
          <h3>
            <PersonIcon fontSize="small" />
            Payee
          </h3>
          <p>{transaction.customer}</p>
        </div>

        <div className="detail-section">
          <h3>
            <AccountIcon fontSize="small" />
            Account
          </h3>
          <p>{transaction.account || 'Unknown Account'}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;