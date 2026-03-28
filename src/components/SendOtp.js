import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

function SendOtp({ onNext, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const sendOtp = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage(""); // Clear any previous messages
    setLoading(true); // Show loading state

    try {
     await axios.post(`${API_URL}/api/auth/send-otp`, {
  name,
  email,
});
      setMessage("OTP sent to your email 📩");

      // Clear input fields
      setName("");
      setEmail("");

      // Call the onNext prop to move to the next step
      onNext(email);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="auth-container">
      <div className="brand">SnapShare</div>

      <h2 className="auth-title">Create account</h2>

      <p className="auth-subtitle">Enter your details to continue</p>

      <form className="auth-form" onSubmit={sendOtp}>
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {/* MESSAGE */}
      {message && <p className="auth-message">{message}</p>}

      {/* LOGIN LINK */}
      <p>
        Already registered?{" "}
        <span
          style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "600" }}
          onClick={goToLogin}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default SendOtp;