import React from 'react';
import { FiUser, FiBriefcase, FiBell, FiLock } from 'react-icons/fi';

const SettingsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <div className="settings-header">
            <FiUser />
            <h2>Profile Settings</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" defaultValue="John Doe" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" defaultValue="john@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" defaultValue="+1 234 567 890" />
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-header">
            <FiBriefcase />
            <h2>Business Information</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input type="text" className="form-input" defaultValue="My Company" />
          </div>
          <div className="form-group">
            <label className="form-label">Business Address</label>
            <textarea className="form-input" rows="3" defaultValue="123 Business Street&#10;City, State 12345&#10;Country" />
          </div>
          <div className="form-group">
            <label className="form-label">Tax ID / VAT Number</label>
            <input type="text" className="form-input" defaultValue="TAX123456789" />
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-header">
            <FiBell />
            <h2>Notification Settings</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Email Notifications</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked /> New Invoice
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked /> Payment Received
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked /> Payment Overdue
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-header">
            <FiLock />
            <h2>Security Settings</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input type="password" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-input" />
          </div>
          <button className="btn btn-primary">Update Password</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 