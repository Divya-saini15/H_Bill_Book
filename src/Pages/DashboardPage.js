import React from 'react';
import { 
  FiDollarSign, 
  FiFileText, 
  FiRepeat, 
  FiUsers,
  FiTrendingUp,
  FiTrendingDown,
  FiClock
} from 'react-icons/fi';

const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,780',
      change: '+12.5%',
      trend: 'up',
      icon: <FiDollarSign />,
      color: 'var(--primary-color)'
    },
    {
      title: 'Total Invoices',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: <FiFileText />,
      color: '#4CAF50'
    },
    {
      title: 'Total Transactions',
      value: '284',
      change: '-2.4%',
      trend: 'down',
      icon: <FiRepeat />,
      color: '#FF9800'
    },
    {
      title: 'Active Customers',
      value: '48',
      change: '+4.8%',
      trend: 'up',
      icon: <FiUsers />,
      color: 'var(--primary-color)'
    }
  ];

  const recentActivity = [
    {
      type: 'invoice',
      title: 'New invoice created',
      time: '2 hours ago',
      amount: '$1,200.00'
    },
    {
      type: 'payment',
      title: 'Payment received',
      time: '5 hours ago',
      amount: '$850.00'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Welcome back, John!</h1>
          <p className="text-muted">Here's what's happening with your business today.</p>
        </div>
        <button className="btn btn-primary">+ New Invoice</button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-title">{stat.title}</span>
              <span className="stat-value">{stat.value}</span>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
                <span>{stat.change} from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <button className="btn btn-text">View All</button>
        </div>
        
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'invoice' ? <FiFileText /> : <FiDollarSign />}
              </div>
              <div className="activity-info">
                <span className="activity-title">{activity.title}</span>
                <div className="activity-meta">
                  <span className="activity-time">
                    <FiClock />
                    {activity.time}
                  </span>
                  <span className="activity-amount">{activity.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 