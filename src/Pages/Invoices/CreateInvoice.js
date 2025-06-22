import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Add as AddIcon,
  Remove as RemoveIcon,
  Save as SaveIcon,
  Close as CloseIcon 
} from '@mui/icons-material';

const CreateInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(true);

  const defaultInvoice = {
    invoiceDetails: {
      number: '',
      date: new Date().toISOString().split('T')[0],
      originalFor: ''
    },
    companyInfo: {
      name: 'TFS TRADERS',
      address: 'shop no.1 achinera road Brij nagar BHARATPUR, bharatpur, Rajasthan, 321001',
      mobile: '9414419941',
      gstin: '08ARQPT1298L1ZS',
      email: 'tfstraders2021@gmail.com'
    },
    billTo: {
      name: '',
      address: '',
      mobile: '',
      state: 'Rajasthan'
    },
    shipTo: {
      name: '',
      address: '',
    },
    items: [
      {
        description: '',
        qty: 1,
        rate: 0,
        tax: 0,
        amount: 0
      }
    ],
    bankDetails: {
      name: 'TFS TRADERS',
      ifscCode: 'HDFC0008852',
      accountNo: '50200080364460',
      bank: 'HDFC Bank,BHARATPUR IV'
    },
    paymentQRCode: {
      upiId: '9414413232-3@axl',
      qrImage: '' // Base64 QR code image
    },
    subtotal: 0,
    cgst: 0,
    sgst: 0,
    total: 0,
    termsAndConditions: 'use of items not return, only repair in warrenty period as company proposed'
  };

  const [invoice, setInvoice] = useState({
    invoiceDetails: {
      number: '',
      date: new Date().toISOString().split('T')[0],
      originalFor: ''
    },
    companyInfo: {
      name: 'TFS TRADERS',
      address: 'shop no.1 achinera road Brij nagar BHARATPUR, bharatpur, Rajasthan, 321001',
      mobile: '9414419941',
      gstin: '08ARQPT1298L1ZS',
      email: 'tfstraders2021@gmail.com'
    },
    billTo: {
      name: '',
      address: '',
      mobile: '',
      state: 'Rajasthan'
    },
    shipTo: {
      name: '',
      address: '',
    },
    items: [
      {
        description: '',
        qty: 1,
        rate: 0,
        tax: 0,
        amount: 0
      }
    ],
    bankDetails: {
      name: 'TFS TRADERS',
      ifscCode: 'HDFC0008852',
      accountNo: '50200080364460',
      bank: 'HDFC Bank,BHARATPUR IV'
    },
    paymentQRCode: {
      upiId: '9414413232-3@axl',
      qrImage: '' // Base64 QR code image
    },
    subtotal: 0,
    cgst: 0,
    sgst: 0,
    total: 0,
    termsAndConditions: 'use of items not return, only repair in warrenty period as company proposed'
  });

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        if (isEditMode) {
          // Load invoice for editing
          const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
          const existingInvoice = savedInvoices.find(inv => inv.invoiceDetails?.number === id);
          
          if (existingInvoice) {
            // Ensure the invoice has all required fields
            const validatedInvoice = {
              ...defaultInvoice,
              ...existingInvoice,
              billTo: {
                ...defaultInvoice.billTo,
                ...(existingInvoice.billTo || {})
              },
              invoiceDetails: {
                ...defaultInvoice.invoiceDetails,
                ...(existingInvoice.invoiceDetails || {})
              },
              shipTo: {
                ...defaultInvoice.shipTo,
                ...(existingInvoice.shipTo || {})
              },
              items: existingInvoice.items?.length ? existingInvoice.items : defaultInvoice.items,
              total: existingInvoice.total || 0,
              subtotal: existingInvoice.subtotal || 0,
              cgst: existingInvoice.cgst || 0,
              sgst: existingInvoice.sgst || 0
            };
            setInvoice(validatedInvoice);
          } else {
            // If invoice not found, redirect to invoices page
            navigate('/invoices');
            return;
          }
        } else {
          // Generate new invoice number
          setInvoice(prev => ({
            ...prev,
            invoiceDetails: {
              ...prev.invoiceDetails,
              number: generateInvoiceNumber()
            }
          }));
        }
      } catch (error) {
        console.error('Error loading invoice:', error);
        navigate('/invoices');
      } finally {
        setIsLoading(false);
      }
    };

    loadInvoice();
  }, [isEditMode, id, navigate]);

  const generateInvoiceNumber = () => {
    const prefix = 'TS/SL/24-25';
    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    let lastNumber = 190;
    if (savedInvoices.length > 0) {
      const lastInvoice = savedInvoices[savedInvoices.length - 1];
      const lastNumStr = lastInvoice.invoiceDetails?.number?.split('/')?.pop();
      const parsed = parseInt(lastNumStr, 10);
      if (!isNaN(parsed)) {
        lastNumber = parsed;
      }
    }
    return `${prefix}/${lastNumber + 1}`;
  };

  const handleBillToChange = (field, value) => {
    setInvoice(prev => ({
      ...prev,
      billTo: {
        ...prev.billTo,
        [field]: value
      }
    }));
  };

  const handleShipToChange = (field, value) => {
    setInvoice(prev => ({
      ...prev,
      shipTo: {
        ...prev.shipTo,
        [field]: value
      }
    }));
  };

  const calculateItemAmount = (item) => {
    const amount = item.qty * item.rate;
    const tax = (amount * item.tax) / 100;
    return amount + tax;
  };

  const handleItemChange = (index, field, value) => {
    setInvoice(prev => {
      const updatedItems = [...(prev.items || [])];
      if (!updatedItems[index]) {
        updatedItems[index] = {
          description: '',
          qty: 1,
          rate: 0,
          tax: 0,
          amount: 0
        };
      }
      
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === 'description' ? value : (parseFloat(value) || 0)
      };

      // Recalculate amount
      updatedItems[index].amount = calculateItemAmount(updatedItems[index]);

      // Recalculate totals
      const subtotal = updatedItems.reduce((sum, item) => sum + (item?.amount || 0), 0);
      const cgst = subtotal * 0.14; // 14% CGST
      const sgst = subtotal * 0.14; // 14% SGST
      const total = subtotal + cgst + sgst;

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        cgst,
        sgst,
        total
      };
    });
  };

  const handleAddItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: '',
          qty: 1,
          rate: 0,
          tax: 0,
          amount: 0
        }
      ]
    }));
  };

  const handleRemoveItem = (index) => {
    setInvoice(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      const cgst = subtotal * 0.14;
      const sgst = subtotal * 0.14;
      const total = subtotal + cgst + sgst;

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        cgst,
        sgst,
        total
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing invoices
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');

    if (isEditMode) {
      // Update existing invoice
      const updatedInvoices = existingInvoices.map(inv => 
        inv.invoiceDetails.number === id ? invoice : inv
      );
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    } else {
      // Add new invoice
      localStorage.setItem('invoices', JSON.stringify([...existingInvoices, invoice]));
    }

    navigate('/invoices');
  };

  function isInvoiceValid(invoice) {
    return (
      invoice &&
      invoice.invoiceDetails &&
      invoice.invoiceDetails.number &&
      invoice.companyInfo &&
      invoice.billTo &&
      Array.isArray(invoice.items) &&
      invoice.items.length > 0
    );
  }

  if (isLoading) {
    return (
      <div className="content-section">
        <div className="loading-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="content-section">
      <header className="page-header">
        <div>
          <h1 className="page-title">
            {isEditMode ? 'Edit Invoice' : 'Create Invoice'}
          </h1>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/invoices')}
          >
            <CloseIcon fontSize="small" />
            Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            <SaveIcon fontSize="small" />
            {isEditMode ? 'Save Changes' : 'Create Invoice'}
          </button>
        </div>
      </header>

      <form className="invoice-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>Invoice Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Invoice Number</label>
              <input
                type="text"
                value={invoice.invoiceDetails.number}
                className="form-input"
                disabled
              />
            </div>
            <div className="form-group">
              <label className="form-label">Invoice Date</label>
              <input
                type="date"
                value={invoice.invoiceDetails.date}
                onChange={(e) => setInvoice(prev => ({
                  ...prev,
                  invoiceDetails: {
                    ...prev.invoiceDetails,
                    date: e.target.value
                  }
                }))}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Original For</label>
              <input
                type="text"
                value={invoice.invoiceDetails.originalFor}
                onChange={(e) => setInvoice(prev => ({
                  ...prev,
                  invoiceDetails: {
                    ...prev.invoiceDetails,
                    originalFor: e.target.value
                  }
                }))}
                className="form-input"
                placeholder="RECIPIENT"
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Bill To</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={invoice.billTo.name}
                onChange={(e) => handleBillToChange('name', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                value={invoice.billTo.address}
                onChange={(e) => handleBillToChange('address', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                value={invoice.billTo.mobile}
                onChange={(e) => handleBillToChange('mobile', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                value={invoice.billTo.state}
                onChange={(e) => handleBillToChange('state', e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Ship To</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={invoice.shipTo.name}
                onChange={(e) => handleShipToChange('name', e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                value={invoice.shipTo.address}
                onChange={(e) => handleShipToChange('address', e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Items</h2>
          <div className="table-container">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Tax (%)</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {invoice.items?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={item?.description || ''}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="form-input"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.qty || 0}
                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                        className="form-input"
                        min="1"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.rate || 0}
                        onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                        className="form-input"
                        min="0"
                        step="0.01"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item?.tax || 0}
                        onChange={(e) => handleItemChange(index, 'tax', e.target.value)}
                        className="form-input"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>₹{((item?.amount || 0)).toFixed(2)}</td>
                    <td>
                      {invoice.items?.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-icon"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <RemoveIcon fontSize="small" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={handleAddItem}
            >
              <AddIcon fontSize="small" />
              Add Item
            </button>
          </div>

          <div className="totals-section">
            <div className="totals-grid">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>CGST (14%):</span>
                <span>₹{invoice.cgst.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>SGST (14%):</span>
                <span>₹{invoice.sgst.toFixed(2)}</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>₹{invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Terms and Conditions</h2>
          <textarea
            value={invoice.termsAndConditions}
            onChange={(e) => setInvoice(prev => ({
              ...prev,
              termsAndConditions: e.target.value
            }))}
            className="form-input"
            rows="3"
          />
        </section>
      </form>
    </div>
  );
};

export default CreateInvoice; 