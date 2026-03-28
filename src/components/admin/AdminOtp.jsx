import { useState } from "react";

export default function AdminOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const verifyOtp = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp
        })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin", email);
        onVerified();
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br />
      <br />

      <button onClick={verifyOtp}>
        Verify OTP
      </button>
    </div>
  );
}
