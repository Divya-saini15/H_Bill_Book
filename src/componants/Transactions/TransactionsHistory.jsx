import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  ArrowUpDown,
  Eye,
  Edit2,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Person as PersonIcon 
} from '@mui/icons-material';

const TransactionHistory = ({ onViewTransaction, onEditTransaction }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockTransactions = [
      { id: '001', customer: 'John Doe', amount: '$250.00', status: 'completed', date: '2025-05-31T10:30:00', paymentMethod: 'Credit Card', category: 'Purchase' },
      { id: '002', customer: 'Jane Smith', amount: '$180.50', status: 'pending', date: '2025-05-31T14:15:00', paymentMethod: 'Bank Transfer', category: 'Service' },
      { id: '003', customer: 'Mike Johnson', amount: '$320.75', status: 'completed', date: '2025-05-30T09:20:00', paymentMethod: 'PayPal', category: 'Purchase' },
      { id: '004', customer: 'Sarah Wilson', amount: '$95.25', status: 'failed', date: '2025-05-30T16:45:00', paymentMethod: 'Credit Card', category: 'Refund' },
      { id: '005', customer: 'David Brown', amount: '$420.00', status: 'completed', date: '2025-05-29T11:10:00', paymentMethod: 'Debit Card', category: 'Purchase' },
      { id: '006', customer: 'Emily Davis', amount: '$750.25', status: 'pending', date: '2025-05-29T13:25:00', paymentMethod: 'Bank Transfer', category: 'Service' },
      { id: '007', customer: 'Robert Miller', amount: '$185.00', status: 'completed', date: '2025-05-28T08:15:00', paymentMethod: 'Credit Card', category: 'Purchase' },
      { id: '008', customer: 'Lisa Anderson', amount: '$95.50', status: 'cancelled', date: '2025-05-28T15:30:00', paymentMethod: 'PayPal', category: 'Refund' },
      { id: '009', customer: 'Thomas Wilson', amount: '$1,250.00', status: 'completed', date: '2025-05-27T12:00:00', paymentMethod: 'Bank Transfer', category: 'Service' },
      { id: '010', customer: 'Jennifer Garcia', amount: '$325.75', status: 'pending', date: '2025-05-27T17:20:00', paymentMethod: 'Credit Card', category: 'Purchase' }
    ];
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortConfig.key === 'amount') {
        aValue = parseFloat(aValue.replace('$', '').replace(',', ''));
        bValue = parseFloat(bValue.replace('$', '').replace(',', ''));
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [transactions, searchTerm, statusFilter, dateRange, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'failed': return <XCircle size={16} />;
      case 'cancelled': return <AlertTriangle size={16} />;
      default: return <Clock size={16} />;
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

  const exportTransactions = () => {
    const csvContent = [
      ['ID', 'Customer', 'Amount', 'Status', 'Date', 'Payment Method', 'Category'],
      ...filteredTransactions.map(t => [
        t.id,
        t.customer,
        t.amount,
        t.status,
        new Date(t.date).toLocaleDateString(),
        t.paymentMethod,
        t.category
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className="transaction-history">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Transaction History</h1>
          <p className="page-subtitle">View and manage all your transaction records</p>
        </div>
        <button className="btn btn--primary" onClick={exportTransactions}>
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="transaction-filters">
        <div className="filter-row">
          {/* Search */}
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Date Range */}
          <div className="date-range-container">
            <Calendar className="date-icon" size={16} />
            <input
              type="date"
              className="date-input"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
            <span className="date-separator">to</span>
            <input
              type="date"
              className="date-input"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>

          {/* Clear Filters */}
          <button
            className="btn btn--secondary"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setDateRange({ start: '', end: '' });
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {currentTransactions.length} of {filteredTransactions.length} transactions</p>
      </div>

      {/* Transaction Table */}
      <div className="transaction-table">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('id')}
                >
                  <div className="header-content">
                    Transaction ID
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('customer')}
                >
                  <div className="header-content">
                    Customer
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('amount')}
                >
                  <div className="header-content">
                    Amount
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th>Status</th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('date')}
                >
                  <div className="header-content">
                    Date
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th>Payment Method</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <span className="transaction-id">#{transaction.id}</span>
                  </td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{transaction.customer}</span>
                    </div>
                  </td>
                  <td>
                    <span className="amount">{transaction.amount}</span>
                  </td>
                  <td>
                    <span className={`status ${getStatusClass(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status}
                    </span>
                  </td>
                  <td>
                    <span className="date">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                    <span className="time">
                      {new Date(transaction.date).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="payment-method">{transaction.paymentMethod}</span>
                  </td>
                  <td>
                    <span className="category">{transaction.category}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn--icon btn--small"
                        onClick={() => onViewTransaction && onViewTransaction(transaction)}
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        className="btn btn--icon btn--small"
                        onClick={() => onEditTransaction && onEditTransaction(transaction)}
                        title="Edit Transaction"
                      >
                        <Edit2 size={14} />
                      </button>
                      <div className="dropdown-container">
                        <button
                          className="btn btn--icon btn--small"
                          onClick={() => setActiveDropdown(
                            activeDropdown === transaction.id ? null : transaction.id
                          )}
                        >
                          <MoreHorizontal size={14} />
                        </button>
                        {activeDropdown === transaction.id && (
                          <div className="dropdown-menu">
                            <button className="dropdown-item">
                              <Download size={12} />
                              Download Receipt
                            </button>
                            <button className="dropdown-item">
                              Duplicate Transaction
                            </button>
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item dropdown-item--danger">
                              Delete Transaction
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {currentTransactions.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-content">
              <Filter size={48} className="empty-state-icon" />
              <h3>No transactions found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn--secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          
          <div className="pagination-info">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            className="btn btn--secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;