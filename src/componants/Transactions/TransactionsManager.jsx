import React, { useState, useEffect } from 'react';
import { 
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  LocalOffer as TagIcon,
  Person as PersonIcon 
} from '@mui/icons-material';

// Sample transaction data
const initialTransactions = [
  {
    id: 1,
    date: '2024-06-01',
    amount: -150.00,
    description: 'Grocery Shopping',
    category: 'Food & Dining',
    type: 'expense',
    payee: 'SuperMart',
    account: 'Checking'
  },
  {
    id: 2,
    date: '2024-06-02',
    amount: 2500.00,
    description: 'Salary Deposit',
    category: 'Income',
    type: 'income',
    payee: 'ABC Company',
    account: 'Checking'
  },
  {
    id: 3,
    date: '2024-06-03',
    amount: -50.00,
    description: 'Gas Station',
    category: 'Transportation',
    type: 'expense',
    payee: 'Shell Gas',
    account: 'Credit Card'
  }
];

// TransactionHistory Component
const TransactionHistory = ({ transactions, onViewTransaction, onEditTransaction, onDeleteTransaction }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
        <div className="text-sm text-gray-600">
          Total: {transactions.length} transactions
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.payee}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                      {transaction.amount < 0 ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View Details"
                      >
                        <VisibilityIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => onEditTransaction(transaction)}
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                        title="Edit Transaction"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete Transaction"
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// TransactionDetail Component
const TransactionDetail = ({ transaction, isOpen, onClose, onEdit }) => {
  if (!isOpen || !transaction) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <CalendarIcon fontSize="small" />
            <div>
              <label className="text-sm font-medium text-gray-500">Date</label>
              <p className="text-sm text-gray-900">{formatDate(transaction.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MoneyIcon fontSize="small" />
            <div>
              <label className="text-sm font-medium text-gray-500">Amount</label>
              <p className={`text-lg font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.amount < 0 ? '-' : '+'}{formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <TagIcon fontSize="small" />
            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="text-sm text-gray-900">{transaction.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <TagIcon fontSize="small" />
            <div>
              <label className="text-sm font-medium text-gray-500">Category</label>
              <p className="text-sm text-gray-900">{transaction.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <PersonIcon fontSize="small" />
            <div>
              <label className="text-sm font-medium text-gray-500">Payee</label>
              <p className="text-sm text-gray-900">{transaction.payee}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MoneyIcon fontSize="small" />
            <div>
              <label className="text-sm font-medium text-gray-500">Account</label>
              <p className="text-sm text-gray-900">{transaction.account}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => onEdit(transaction)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Edit Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

// TransactionForm Component
const TransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: transaction?.date || new Date().toISOString().split('T')[0],
    amount: transaction?.amount || '',
    description: transaction?.description || '',
    category: transaction?.category || '',
    type: transaction?.type || 'expense',
    payee: transaction?.payee || '',
    account: transaction?.account || 'Checking'
  });

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Income', 'Transfer', 'Other'
  ];

  const accounts = ['Checking', 'Savings', 'Credit Card', 'Cash'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      amount: parseFloat(formData.amount) * (formData.type === 'expense' ? -1 : 1),
      id: transaction?.id || Date.now()
    };
    onSubmit(submitData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {transaction ? 'Edit Transaction' : 'Add New Transaction'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowBackIcon fontSize="small" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={Math.abs(formData.amount)}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter transaction description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account
              </label>
              <select
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {accounts.map(account => (
                  <option key={account} value={account}>{account}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payee
            </label>
            <input
              type="text"
              name="payee"
              value={formData.payee}
              onChange={handleChange}
              placeholder="Enter payee name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {transaction ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main TransactionManager Component
const TransactionManager = () => {
  const [currentView, setCurrentView] = useState('history');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactions, setTransactions] = useState(initialTransactions);

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setCurrentView('form');
    setShowDetailModal(false);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
  };

  const handleFormSubmit = (transactionData) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions(prev => 
        prev.map(t => t.id === editingTransaction.id ? transactionData : t)
      );
    } else {
      // Add new transaction
      setTransactions(prev => [...prev, transactionData]);
    }
    
    // Reset state and go back to history
    setEditingTransaction(null);
    setCurrentView('history');
  };

  const handleFormCancel = () => {
    setEditingTransaction(null);
    setCurrentView('history');
  };

  const handleDeleteTransaction = (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    }
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {currentView === 'history' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Transaction Manager</h1>
              <button
                onClick={handleAddNew}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <AddIcon fontSize="small" />
                <span>Add Transaction</span>
              </button>
            </div>
            
            <TransactionHistory
              transactions={transactions}
              onViewTransaction={handleViewTransaction}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        )}

        {currentView === 'form' && (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Transaction Manager</h1>
            </div>
            
            <TransactionForm
              transaction={editingTransaction}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        )}

        <TransactionDetail
          transaction={selectedTransaction}
          isOpen={showDetailModal}
          onClose={handleCloseDetail}
          onEdit={handleEditTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionManager;