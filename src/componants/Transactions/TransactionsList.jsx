import React, { useState, useEffect } from 'react';
import { 
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  AttachMoney as MoneyIcon 
} from '@mui/icons-material';

const TransactionList = ({ tenantId }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with API call
  const mockTransactions = [
    { id: '001', customer: 'John Doe', amount: 250.00, status: 'completed', date: '2025-05-31', type: 'payment', reference: 'TXN001', email: 'john@example.com' },
    { id: '002', customer: 'Jane Smith', amount: 180.50, status: 'pending', date: '2025-05-31', type: 'refund', reference: 'TXN002', email: 'jane@example.com' },
    { id: '003', customer: 'Mike Johnson', amount: 320.75, status: 'completed', date: '2025-05-30', type: 'payment', reference: 'TXN003', email: 'mike@example.com' },
    { id: '004', customer: 'Sarah Wilson', amount: 95.25, status: 'failed', date: '2025-05-30', type: 'payment', reference: 'TXN004', email: 'sarah@example.com' },
    { id: '005', customer: 'David Brown', amount: 420.00, status: 'completed', date: '2025-05-29', type: 'payment', reference: 'TXN005', email: 'david@example.com' },
    { id: '006', customer: 'Lisa Garcia', amount: 75.30, status: 'pending', date: '2025-05-29', type: 'refund', reference: 'TXN006', email: 'lisa@example.com' },
    { id: '007', customer: 'Tom Wilson', amount: 199.99, status: 'completed', date: '2025-05-28', type: 'payment', reference: 'TXN007', email: 'tom@example.com' },
    { id: '008', customer: 'Anna Davis', amount: 350.00, status: 'failed', date: '2025-05-28', type: 'payment', reference: 'TXN008', email: 'anna@example.com' },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortTransactions();
  }, [searchTerm, statusFilter, dateFilter, sortField, sortDirection, transactions]);

  const filterAndSortTransactions = () => {
    let filtered = [...transactions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(transaction => 
            new Date(transaction.date) >= filterDate
          );
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(transaction => 
            new Date(transaction.date) >= filterDate
          );
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(transaction => 
            new Date(transaction.date) >= filterDate
          );
          break;
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortField === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectTransaction = (id) => {
    setSelectedTransactions(prev => 
      prev.includes(id) 
        ? prev.filter(txId => txId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredTransactions.map(tx => tx.id));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'failed':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status status--success';
      case 'pending':
        return 'status status--pending';
      case 'failed':
        return 'status status--failed';
      default:
        return 'status';
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="transaction-loading">
        <div className="loading-spinner-large">
          <RefreshCw size={32} className="animate-spin" />
        </div>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="transaction-container">
      {/* Header */}
      <div className="transaction-header">
        <div className="transaction-header__left">
          <h1 className="transaction-title">Transactions</h1>
          <p className="transaction-subtitle">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="transaction-header__right">
          <button className="btn btn--secondary" onClick={() => setShowFilters(!showFilters)}>
            <FilterListIcon fontSize="small" />
            Filters
          </button>
          <button className="btn btn--secondary">
            <Download size={16} />
            Export
          </button>
          <button className="btn btn--primary">
            <AddIcon fontSize="small" />
            New Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="transaction-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Search</label>
              <div className="search-input-container">
                <SearchIcon fontSize="small" className="search-icon" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Date Range</label>
              <select 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="transaction-stats">
        <div className="stat-card stat-card--small">
          <div className="stat-value">${filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(2)}</div>
          <div className="stat-label">Total Amount</div>
        </div>
        <div className="stat-card stat-card--small">
          <div className="stat-value">{filteredTransactions.filter(tx => tx.status === 'completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card stat-card--small">
          <div className="stat-value">{filteredTransactions.filter(tx => tx.status === 'pending').length}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card stat-card--small">
          <div className="stat-value">{filteredTransactions.filter(tx => tx.status === 'failed').length}</div>
          <div className="stat-label">Failed</div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="transaction-table-container">
        <div className="transaction-table">
          <div className="table-header">
            <div className="table-actions">
              {selectedTransactions.length > 0 && (
                <div className="bulk-actions">
                  <span>{selectedTransactions.length} selected</span>
                  <button className="btn btn--sm btn--secondary">Export Selected</button>
                  <button className="btn btn--sm btn--danger">Delete Selected</button>
                </div>
              )}
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th className="table-header-cell">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.length === filteredTransactions.length}
                      onChange={handleSelectAll}
                      className="checkbox"
                    />
                  </th>
                  <th className="table-header-cell sortable" onClick={() => handleSort('id')}>
                    Transaction ID
                    <ArrowUpIcon fontSize="small" className="sort-icon" />
                  </th>
                  <th className="table-header-cell sortable" onClick={() => handleSort('customer')}>
                    Customer
                    <ArrowUpIcon fontSize="small" className="sort-icon" />
                  </th>
                  <th className="table-header-cell sortable" onClick={() => handleSort('amount')}>
                    Amount
                    <MoneyIcon fontSize="small" className="sort-icon" />
                  </th>
                  <th className="table-header-cell sortable" onClick={() => handleSort('status')}>
                    Status
                    <ArrowUpIcon fontSize="small" className="sort-icon" />
                  </th>
                  <th className="table-header-cell sortable" onClick={() => handleSort('date')}>
                    Date
                    <ArrowUpIcon fontSize="small" className="sort-icon" />
                  </th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="table-row">
                    <td className="table-cell">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction.id)}
                        onChange={() => handleSelectTransaction(transaction.id)}
                        className="checkbox"
                      />
                    </td>
                    <td className="table-cell">
                      <div className="transaction-id">
                        #{transaction.id}
                        <span className="transaction-reference">{transaction.reference}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="customer-info">
                        <div className="customer-name">{transaction.customer}</div>
                        <div className="customer-email">{transaction.email}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="amount-info">
                        <span className="amount">${transaction.amount.toFixed(2)}</span>
                        <span className={`transaction-type ${transaction.type}`}>{transaction.type}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className={getStatusClass(transaction.status)}>
                        {getStatusIcon(transaction.status)}
                        <span>{transaction.status}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="date-info">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="action-buttons">
                        <button className="action-btn" title="View Details">
                          <VisibilityIcon fontSize="small" />
                        </button>
                        <button className="action-btn" title="Edit">
                          <EditIcon fontSize="small" />
                        </button>
                        <button className="action-btn action-btn--danger" title="Delete">
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-info">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} results
              </div>
              <div className="pagination-controls">
                <button 
                  className="pagination-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className="pagination-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;