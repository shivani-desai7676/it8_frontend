import { useState } from "react";
import axios from "axios";

export default function VerifyOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Track loading state
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const handleVerify = async () => {
    // Simple form validation
    if (!otp || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await axios.post(`${API_URL}/api/admin/verify-otp`, {
  email,
  otp,
  password
});

      setMessage(res.data.message); // Show success message

      setTimeout(() => {
        onVerified(); // Proceed to login or next step
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP ❌");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
      />

      <button
        onClick={handleVerify}
        disabled={loading}  // Disable button during loading
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {message && (
        <p
          style={{
            color: message.startsWith("Invalid") ? "red" : "green",
            marginTop: "10px"
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
