import React, { useState } from 'react';

const TenantForm = ({ onSubmit }) => {
  const [tenantId, setTenantId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!tenantId.trim()) {
      setError('Tenant ID is required');
      return;
    }

    if (tenantId.length < 3) {
      setError('Tenant ID must be at least 3 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(tenantId);
    } catch (err) {
      setError('Failed to validate tenant ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Enter Tenant ID</h2>
          <p className="form-subtitle">Please enter your account name to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="tenantId" className="form-label">
              Tenant ID (Account Name)
            </label>
            <input
              type="text"
              id="tenantId"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              className={`form-input ${error ? 'form-input--error' : ''}`}
              placeholder="Enter your tenant ID"
              disabled={isLoading}
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <button 
            type="submit" 
            className="form-button form-button--primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Validating...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenantForm;