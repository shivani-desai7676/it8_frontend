import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/users`);
        setUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading users...</p>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Verified</th>
              <th style={th}>OTP</th>
              <th style={th}>OTP Expiry</th>
              <th style={th}>Created At</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={td}>{u.name || "-"}</td>
                <td style={td}>{u.email || "-"}</td>

                <td style={td}>
                  <span
                    style={{
                      color: u.isVerified ? "green" : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {u.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </td>

                <td style={td}>{u.otp || "-"}</td>

                <td style={td}>
                  {u.otpExpiry
                    ? new Date(u.otpExpiry).toLocaleString()
                    : "-"}
                </td>

                <td style={td}>
                  {u.created_at
                    ? new Date(u.created_at).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const th = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  background: "#f1f5f9",
  textAlign: "left"
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee"
};
