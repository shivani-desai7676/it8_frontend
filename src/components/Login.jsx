import { useState } from "react";
import axios from "axios";

export default function Login({ onNext }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Check if the email is valid
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Start loading

    try {
      await axios.post(`${API_URL}/api/auth/login`, { email });

      setMessage("OTP sent to your email 📧");

      // Move to OTP page after a delay
      setTimeout(() => {
        onNext(email);
      }, 1000);

    } catch (err) {
      setMessage("Failed to send OTP ❌");

    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>

      {message && <p>{message}</p>} {/* Display message */}
    </div>
  );
}