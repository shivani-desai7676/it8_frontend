import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminActivity({ type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchData = useCallback(async () => {
    try {
      const url =
        type === "history"
          ? `${API_URL}/api/admin/activity/history`
          : `${API_URL}/api/admin/activity/status`;

      const res = await axios.get(url);
      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching activity:", err);
    } finally {
      setLoading(false);
    }
  }, [type, API_URL]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading activity...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        {type === "history" ? "Login / Logout History" : "User Status"}
      </h2>

      {data.length === 0 ? (
        <p>No activity found</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Email</th>

              {type === "history" && <th style={th}>Login Time</th>}
              {type === "history" && <th style={th}>Logout Time</th>}

              {type === "status" && <th style={th}>Status</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td style={td}>{item.email}</td>

                {type === "history" && (
                  <>
                    <td style={td}>
                      {item.loginTime
                        ? new Date(item.loginTime).toLocaleString()
                        : "-"}
                    </td>

                    <td style={td}>
                      {item.logoutTime
                        ? new Date(item.logoutTime).toLocaleString()
                        : "Still Online"}
                    </td>
                  </>
                )}

                {type === "status" && (
                  <td style={td}>
                    <span
                      style={{
                        color: item.isOnline ? "green" : "red",
                        fontWeight: "bold"
                      }}
                    >
                      {item.isOnline ? "● Online" : "● Offline"}
                    </span>
                  </td>
                )}
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
  background: "white"
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
