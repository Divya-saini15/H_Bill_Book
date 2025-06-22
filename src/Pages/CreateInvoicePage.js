import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const CreateInvoicePage = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    companyName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    invoiceNumber: 'INV-337228',
    invoiceDate: '07-06-2025',
    dueDate: '',
    paymentTerms: 'Net 30',
    currency: '',
    taxRate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Create Invoice</h1>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
            <FiX /> CANCEL
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}>
            CREATE INVOICE
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: 'var(--background-white)', padding: 'var(--spacing-lg)', borderRadius: 'var(--border-radius-lg)', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>Client Information</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
            <div className="form-group">
              <label className="form-label">CLIENT NAME *</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">PHONE NUMBER</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">COMPANY NAME</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 'var(--spacing-md)' }}>
            <label className="form-label">BILLING ADDRESS</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="form-input"
              placeholder="Street Address"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
            <div className="form-group">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-input"
                placeholder="State"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="form-input"
                placeholder="ZIP Code"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--background-white)', padding: 'var(--spacing-lg)', borderRadius: 'var(--border-radius-lg)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)' }}>Invoice Details</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)' }}>
            <div className="form-group">
              <label className="form-label">INVOICE NUMBER</label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                className="form-input"
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">INVOICE DATE</label>
              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">DUE DATE</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">PAYMENT TERMS</label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Net 30">Net 30</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 7">Net 7</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">CURRENCY</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Currency</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">TAX RATE (%)</label>
              <input
                type="number"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
                className="form-input"
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoicePage; 