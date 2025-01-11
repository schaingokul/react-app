import React, {useState} from 'react';
import './AdminCard.css';  // For styling the card
import Machine from '../components/Machine.js'
import UserList from './UserList.js';
export const AdminCard = () => {
  const [activeTab, setActiveTab] = useState('Machine');  // Default active tab

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-card">
      <h2 className="card-title">Admin</h2>
      <div className="bars">
        <div
          className={`bar ${activeTab === 'Machine' ? 'active' : ''}`}
          onClick={() => handleTabClick('Machine')}
        >
          Machine
        </div>
        <div
          className={`bar ${activeTab === 'Attendance' ? 'active' : ''}`}
          onClick={() => handleTabClick('Attendance')}
        >
          Attendance
        </div>
        <div
          className={`bar ${activeTab === 'Create Users' ? 'active' : ''}`}
          onClick={() => handleTabClick('Create Users')}
        >
          Create Users
        </div>
      </div>

      {/* Conditionally render content based on the active tab */}
      <div className="content">
        {activeTab === 'Machine' && <div><Machine /></div>}
        {activeTab === 'Attendance' && <div><UserList /></div>}
        {activeTab === 'Create Users' && <div>Create Users content goes here</div>}
      </div>
    </div>
  );
};
