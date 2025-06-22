import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Modal from '../components/Modals/Modal';

const TenantPage = () => {
  const navigate = useNavigate();
  const [tenantId, setTenantId] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const [createError, setCreateError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tenantId.trim()) {
      setError('Please enter your Account ID');
      return;
    }
    // Store tenant ID in localStorage
    localStorage.setItem('tenantId', tenantId);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome to Bill Book</h1>
          <p className="text-muted">Enter your Account ID to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Account ID</label>
            <input
              type="text"
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Enter your Account ID"
              value={tenantId}
              onChange={(e) => {
                setTenantId(e.target.value);
                setError('');
              }}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Continue <FiArrowRight />
          </button>

          <p className="text-center text-muted mt-4">
            Don't have an account? <button type="button" className="btn btn-link" onClick={() => setShowModal(true)}>Create one</button>
          </p>
        </form>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} title="Create Account">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newAccountName.trim()) {
              setCreateError('Account name is required');
              return;
            }
            setIsCreating(true);
            setCreateError('');
            try {
              const res = await fetch('/accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newAccountName, email: `${newAccountName}@example.com` })
              });
              if (!res.ok) throw new Error('Failed to create account');
              const data = await res.json();
              localStorage.setItem('tenantId', data.id || data.account?.id || newAccountName);
              setShowModal(false);
              setNewAccountName('');
              navigate('/login');
            } catch (err) {
              setCreateError('Failed to create account. Try a different name.');
            } finally {
              setIsCreating(false);
            }
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <label className="form-label">Account Name</label>
          <input
            type="text"
            className="form-input"
            value={newAccountName}
            onChange={e => setNewAccountName(e.target.value)}
            placeholder="Enter account name"
            disabled={isCreating}
          />
          {createError && <span className="error-message">{createError}</span>}
          <button type="submit" className="btn btn-primary" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TenantPage;