import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);  // State to hold the list of users
  const [loading, setLoading] = useState(true);  // State for loading state
  const [error, setError] = useState('');  // State for any errors

  useEffect(() => {
    // Function to fetch user data
    axios
      .post('http://localhost:3000/api/admin/alluser', {
        type: 'Admin',  // Sending the type in the request body
      })  // Your API endpoint for fetching users
      .then((response) => {
        console.log(response.data.data)
        setUsers(response.data.data);
          // Set the user data in state
        setLoading(false);  // Stop loading once the data is fetched
      })
      .catch((err) => {
        setError('Failed to fetch user data');  // Handle error
        setLoading(false);
      });
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <p>User ID: {user.userId}</p>
            <p>Type: {user.type}</p>
            <p>Created At: {user.createdAt}</p>
            <p>Updated At: {user.updatedAt}</p>
            {user.leave.length > 0 && (
              <div>
                <h4>Leave History</h4>
                <ul>
                  {user.leave.map((leave, index) => (
                    <li key={index}>
                      {leave.reason} - {leave.isApproval ? 'Approved' : 'Pending'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;