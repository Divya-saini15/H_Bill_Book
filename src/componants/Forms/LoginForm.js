import React, { useState } from 'react';

const LoginForm = ({ tenantId, onSubmit, onBack }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation (in real app, this would be server-side)
      if (password === 'password123') {
        onSubmit({ tenantId, password });
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">
            Logging in as: <strong>{tenantId}</strong>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input ${error ? 'form-input--error' : ''}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="form-button form-button--secondary"
              onClick={onBack}
              disabled={isLoading}
            >
              Back
            </button>
            <button 
              type="submit" 
              className="form-button form-button--primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="form-footer">
          <p className="demo-note">
            <strong>Demo:</strong> Use password "password123" to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;