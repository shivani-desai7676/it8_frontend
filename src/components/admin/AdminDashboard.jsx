import { useState } from "react";
import AdminProfile from "./AdminProfile";
import AdminFiles from "./AdminFiles";
import AdminActivity from "./AdminActivity";

export default function AdminDashboard() {
  const [section, setSection] = useState("profile");
  const [activityView, setActivityView] = useState("history");

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.reload();
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* LEFT CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f1f5f9",
          overflowY: "auto"
        }}
      >
        {section === "profile" && <AdminProfile />}
        {section === "files" && <AdminFiles />}

        {section === "activity" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>User Activity</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                onClick={() => setActivityView("history")}
                style={{
                  ...tabBtn,
                  background: activityView === "history" ? "#3b82f6" : "#94a3b8"
                }}
              >
                Activity History
              </button>

              <button
                onClick={() => setActivityView("status")}
                style={{
                  ...tabBtn,
                  background: activityView === "status" ? "#3b82f6" : "#94a3b8"
                }}
              >
                Online / Offline
              </button>
            </div>

            <div style={card}>
              <AdminActivity type={activityView} />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          width: "250px",
          background: "#1e293b",
          color: "white",
          padding: "20px"
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Admin Panel</h3>

        <button style={menuBtn} onClick={() => setSection("profile")}>
          Profile
        </button>

        <button style={menuBtn} onClick={() => setSection("files")}>
          See Users
        </button>

        <button style={menuBtn} onClick={() => setSection("activity")}>
          User Activity
        </button>

        <button style={{ ...menuBtn, background: "#ef4444" }} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const menuBtn = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  background: "#3b82f6",
  border: "none",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const tabBtn = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};
