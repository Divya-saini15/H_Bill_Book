import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import ViewTransactionModal from '../components/Modals/ViewTransactionModal.js';
import EditTransactionModal from '../components/Modals/EditTransactionModal.js';
import '../styles/transactions.css';
import { FiSearch, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TRX001',
      date: '2024-03-15',
      description: 'Website Development',
      amount: 1200.00,
      type: 'credit',
      status: 'completed',
      customer: 'John Doe'
    },
    {
      id: 'TRX002',
      date: '2024-03-14',
      description: 'Server Hosting',
      amount: -80.00,
      type: 'debit',
      status: 'pending',
      customer: 'Cloud Services Inc.'
    },
    {
      id: 'TRX003',
      date: '2024-03-14',
      description: 'Design Services',
      amount: 450.00,
      type: 'credit',
      status: 'completed',
      customer: 'Sarah Wilson'
    },
    {
      id: 'TRX004',
      date: '2024-03-13',
      description: 'Software License',
      amount: -120.00,
      type: 'debit',
      status: 'failed',
      customer: 'Tech Solutions Ltd'
    },
    {
      id: 'TRX005',
      date: '2024-03-13',
      description: 'Consulting Fee',
      amount: 800.00,
      type: 'credit',
      status: 'completed',
      customer: 'Mike Johnson'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Filter transactions whenever filters change
  useEffect(() => {
    let filtered = transactions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction => 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(transaction => 
        transaction.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // Apply date filters
    if (startDate && endDate) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, selectedStatus, startDate, endDate]);

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsCreatingNew(false);
    setEditModalOpen(true);
  };

  const handleCreateTransaction = () => {
    setSelectedTransaction(null);
    setIsCreatingNew(true);
    setEditModalOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSaveTransaction = (transactionData) => {
    if (isCreatingNew) {
      // Create new transaction
      const newTransaction = {
        ...transactionData,
        id: `TRX${(transactions.length + 1).toString().padStart(3, '0')}`
      };
      setTransactions(prev => [...prev, newTransaction]);
    } else {
      // Update existing transaction
      setTransactions(prev => 
        prev.map(t => t.id === transactionData.id ? transactionData : t)
      );
    }
    setEditModalOpen(false);
    setSelectedTransaction(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Transactions</h1>
        <button 
          className="btn btn-primary"
          onClick={handleCreateTransaction}
        >
          + NEW TRANSACTION
        </button>
      </div>

      <div className="filters-container">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="form-input"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <input
          type="date"
          className="form-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />

        <input
          type="date"
          className="form-input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>TRANSACTION ID</th>
              <th>CUSTOMER</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.customer}</td>
                <td className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                  {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td>
                  <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>{transaction.date}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-button"
                      onClick={() => handleViewTransaction(transaction)}
                    >
                      <FiEye />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleEditTransaction(transaction)}
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="empty-state">
          <ReceiptIcon className="empty-state-icon" />
          <p className="empty-state-text">No transactions found</p>
          <button 
            className="btn btn-primary"
            onClick={handleCreateTransaction}
          >
            <AddIcon />
            Create Transaction
          </button>
        </div>
      )}

      {viewModalOpen && (
        <ViewTransactionModal
          transaction={selectedTransaction}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedTransaction(null);
          }}
          onEdit={() => {
            setViewModalOpen(false);
            handleEditTransaction(selectedTransaction);
          }}
        />
      )}

      {editModalOpen && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedTransaction(null);
            setIsCreatingNew(false);
          }}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
};

export default TransactionsPage; 