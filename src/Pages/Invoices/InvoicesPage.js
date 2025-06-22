import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  Download as DownloadIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import CircularProgress from '@mui/material/CircularProgress';
import ViewInvoiceModal from '../../components/Modals/ViewInvoiceModal';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: {
      from: '',
      to: '',
    },
    status: 'All',
    amountRange: {
      min: '',
      max: '',
    },
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [downloadingInvoices, setDownloadingInvoices] = useState([]);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    // Load invoices from localStorage
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      try {
        const parsedInvoices = JSON.parse(savedInvoices);
        // Ensure each invoice has the required structure
        const validatedInvoices = parsedInvoices.map(invoice => ({
          ...invoice,
          billTo: invoice.billTo || { name: '', address: '', mobile: '', state: 'Rajasthan' },
          invoiceDetails: invoice.invoiceDetails || { number: '', date: '', originalFor: '' },
          items: invoice.items || [],
          total: invoice.total || 0
        }));
        setInvoices(validatedInvoices);
      } catch (error) {
        console.error('Error parsing invoices:', error);
        setInvoices([]);
      }
    }
  }, []);

  const handleViewInvoice = (invoice) => {
    setViewingInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value,
      },
    }));
  };

  const handleAmountRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      amountRange: {
        ...prev.amountRange,
        [field]: value,
      },
    }));
  };

  const handleSelectInvoice = (invoiceId) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      }
      return [...prev, invoiceId];
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.invoiceDetails.number));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleDeleteInvoices = (invoiceIds = selectedInvoices) => {
    if (window.confirm('Are you sure you want to delete the selected invoice(s)?')) {
      const updatedInvoices = invoices.filter(
        invoice => !invoiceIds.includes(invoice.invoiceDetails.number)
      );
      setInvoices(updatedInvoices);
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      setSelectedInvoices([]);
    }
  };

  const handleDuplicateInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      invoiceDetails: {
        ...invoice.invoiceDetails,
        number: generateInvoiceNumber(),
        date: new Date().toISOString().split('T')[0]
      }
    };
    
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };

  const generateInvoiceNumber = () => {
    const prefix = 'TS/SL/24-25';
    const lastNumber = invoices.length > 0 
      ? parseInt(invoices[invoices.length - 1].invoiceDetails.number.split('/').pop())
      : 190;
    return `${prefix}/${lastNumber + 1}`;
  };

  const handleDownloadInvoices = async (selectedIds = selectedInvoices) => {
    try {
      setDownloading(true);
      setDownloadingInvoices(selectedIds);

      // If multiple invoices are selected, download them one by one
      for (const invoiceId of selectedIds) {
        const invoice = invoices.find(inv => 
          inv.invoiceDetails?.number === invoiceId || 
          inv.invoiceNumber === invoiceId
        );
        
        if (invoice) {
          await generateInvoicePDF(invoice);
          // Add a small delay between downloads to prevent browser issues
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error('Error downloading invoices:', error);
      alert('Failed to download invoice(s). Please try again.');
    } finally {
      setDownloading(false);
      setDownloadingInvoices([]);
    }
  };

  const handleDownloadSingleInvoice = async (invoice) => {
    try {
      const invoiceId = invoice.invoiceDetails?.number || invoice.invoiceNumber;
      setDownloadingInvoices(prev => [...prev, invoiceId]);
      
      await generateInvoicePDF(invoice);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    } finally {
      const invoiceId = invoice.invoiceDetails?.number || invoice.invoiceNumber;
      setDownloadingInvoices(prev => prev.filter(id => id !== invoiceId));
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    // Search filter
    const searchMatch = 
      (invoice.billTo?.name?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
      (invoice.billTo?.mobile?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
      (invoice.invoiceDetails?.number?.toLowerCase() || '').includes(filters.search.toLowerCase());
    
    // Date range filter
    const invoiceDate = new Date(invoice.invoiceDetails?.date || '');
    const dateFromMatch = !filters.dateRange.from || invoiceDate >= new Date(filters.dateRange.from);
    const dateToMatch = !filters.dateRange.to || invoiceDate <= new Date(filters.dateRange.to);
    
    // Amount range filter
    const amount = invoice.total || 0;
    const amountMinMatch = !filters.amountRange.min || amount >= parseFloat(filters.amountRange.min);
    const amountMaxMatch = !filters.amountRange.max || amount <= parseFloat(filters.amountRange.max);

    return searchMatch && dateFromMatch && dateToMatch && amountMinMatch && amountMaxMatch;
  });

  return (
    <div className="content-section">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1 className="page-title">Invoices</h1>
        </div>
        <Link to="/invoices/create" className="btn btn-primary">
          <AddIcon fontSize="small" />
          Create Invoice
        </Link>
      </header>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <SearchIcon fontSize="small" className="search-icon" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
        </div>

        <button 
          className={`btn btn-secondary filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterListIcon fontSize="small" />
          Filters
        </button>

        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range">
                <input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) => handleDateRangeChange('from', e.target.value)}
                  className="date-input"
                />
                <span>to</span>
                <input
                  type="date"
                  value={filters.dateRange.to}
                  onChange={(e) => handleDateRangeChange('to', e.target.value)}
                  className="date-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Amount Range</label>
              <div className="amount-range">
                <div className="amount-input">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.amountRange.min}
                    onChange={(e) => handleAmountRangeChange('min', e.target.value)}
                    className="form-input"
                  />
                </div>
                <span>to</span>
                <div className="amount-input">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.amountRange.max}
                    onChange={(e) => handleAmountRangeChange('max', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => setFilters({
                search: '',
                dateRange: { from: '', to: '' },
                status: 'All',
                amountRange: { min: '', max: '' },
              })}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Actions Bar */}
      <div className="actions-bar">
        {selectedInvoices.length > 0 && (
          <div className="bulk-actions">
            <button className="btn btn-danger" onClick={() => handleDeleteInvoices()}>
              <DeleteIcon fontSize="small" />
              Delete Selected
            </button>
            <button 
              className={`btn btn-secondary ${downloading ? 'disabled' : ''}`}
              onClick={() => !downloading && handleDownloadInvoices()}
              title="Download selected invoices as PDF"
              disabled={downloading}
            >
              <DownloadIcon fontSize="small" />
              {downloading ? 'Downloading...' : 'Download Selected'}
            </button>
          </div>
        )}
      </div>

      {/* Invoices Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                />
              </th>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No invoices found
                </td>
              </tr>
            ) : (
              filteredInvoices.map(invoice => {
                const invoiceId = invoice.invoiceDetails?.number || invoice.invoiceNumber;
                const isDownloading = downloadingInvoices.includes(invoiceId);

                return (
                  <tr key={invoiceId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(invoiceId)}
                        onChange={() => handleSelectInvoice(invoiceId)}
                      />
                    </td>
                    <td>{invoiceId}</td>
                    <td>{new Date(invoice.invoiceDetails?.date || invoice.invoiceDate).toLocaleDateString()}</td>
                    <td>
                      <div className="client-info">
                        <span className="client-name">{invoice.billTo?.name}</span>
                        <span className="client-mobile">{invoice.billTo?.mobile}</span>
                      </div>
                    </td>
                    <td>₹{(invoice.total || 0).toFixed(2)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-icon"
                          title="View"
                          onClick={() => handleViewInvoice(invoice)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </button>
                        <Link 
                          to={`/invoices/${invoiceId}/edit`}
                          className="btn btn-icon"
                          title="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </Link>
                        <button 
                          className="btn btn-icon"
                          onClick={() => handleDuplicateInvoice(invoice)}
                          title="Duplicate"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </button>
                        <button 
                          className={`btn btn-icon ${isDownloading ? 'disabled' : ''}`}
                          onClick={() => !isDownloading && handleDownloadSingleInvoice(invoice)}
                          title="Download as PDF"
                          disabled={isDownloading}
                        >
                          {isDownloading ? (
                            <CircularProgress size={20} />
                          ) : (
                            <DownloadIcon fontSize="small" />
                          )}
                        </button>
                        <button 
                          className="btn btn-icon text-danger"
                          onClick={() => handleDeleteInvoices([invoiceId])}
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <ViewInvoiceModal
        show={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        invoice={viewingInvoice}
      />
    </div>
  );
};

export default InvoicesPage; 