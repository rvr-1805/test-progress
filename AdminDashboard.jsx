// AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin. Manage users, batches, and fees here.</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <button>Students</button>
        <button>Teachers</button>
        <button>Batches</button>
        <button>Fees</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
