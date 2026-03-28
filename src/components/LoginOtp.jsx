import { useState } from "react";
import axios from "axios";

export default function LoginOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    console.log("Sending OTP verification:", { email, otp });

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/verify-login-otp`,
        { email, otp }
      );

      const { token, userId } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("userId", userId);

      onVerified(token);

    } catch (err) {
      console.log("OTP ERROR:", err.response);
      setMessage(err.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Enter OTP sent to {email}</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
      />

      <button onClick={verifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
