import React from 'react';

const StatsCard = ({ title, value, change, changeType, icon: IconComponent }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <IconComponent className="stat-icon" size={24} />
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${changeType}`}>
        {change} from last month
      </div>
    </div>
  );
};

export default StatsCard;