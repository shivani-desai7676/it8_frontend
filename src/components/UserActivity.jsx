import { useEffect, useState } from "react";
import axios from "axios";

export default function UserActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in. Please login to view your activity.");
      setLoading(false);
      return;
    }

    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/activity`, {
          headers: {
            Authorization: token
          }
        });

        setActivities(res.data);
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError("Failed to load activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [API_URL]);

  if (loading) return <p>Loading your activity...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Your Login/Logout Activity</h2>

      {activities.length === 0 ? (
        <p>No activity found</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Login Time</th>
              <th style={th}>Logout Time</th>
              <th style={th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((a) => {
              const isOffline = !a.isOnline;

              return (
                <tr key={a._id}>
                  <td style={td}>{a.name}</td>
                  <td style={td}>{a.email}</td>

                  <td style={td}>
                    {a.lastLogin
                      ? new Date(a.lastLogin).toLocaleString()
                      : "-"}
                  </td>

                  <td style={td}>
                    {a.lastLogout
                      ? new Date(a.lastLogout).toLocaleString()
                      : "-"}
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        color: isOffline ? "red" : "green",
                        fontWeight: "bold"
                      }}
                    >
                      {isOffline ? "❌ Offline" : "✅ Online"}
                    </span>
                  </td>
                </tr>
              );
            })}
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
  marginTop: "20px"
};

const th = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  background: "#f1f5f9",
  textAlign: "left"
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee"
};
