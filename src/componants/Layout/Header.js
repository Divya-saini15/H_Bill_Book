import React, { useState } from 'react';

const Header = ({ tenantId, onLogout, onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout();
  };

  return (
    <header className="header">
      <div className="header__left">
        <button 
          className="header__menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
        <div className="header__logo">
          <h1 className="header__title">Dashboard</h1>
        </div>
      </div>

      <div className="header__center">
        <div className="header__search">
          <input
            type="text"
            placeholder="Search..."
            className="header__search-input"
          />
          <button className="header__search-button">
            🔍
          </button>
        </div>
      </div>

      <div className="header__right">
        <div className="header__notifications">
          <button className="header__notification-btn">
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>
        </div>

        <div className="header__user">
          <button 
            className="header__user-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-avatar">
              {tenantId.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{tenantId}</span>
              <span className="user-role">Tenant</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showDropdown && (
            <div className="header__dropdown">
              <div className="dropdown-item">
                <span>👤</span>
                Profile
              </div>
              <div className="dropdown-item">
                <span>⚙️</span>
                Settings
              </div>
              <div className="dropdown-item">
                <span>💡</span>
                Help
              </div>
              <hr className="dropdown-divider" />
              <button className="dropdown-item dropdown-item--danger" onClick={handleLogout}>
                <span>🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;