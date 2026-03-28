import { useState } from "react";

export default function AdminLogin({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Sent Successfully!");
        onNext(email);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Server error while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Enter Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <button onClick={sendOtp} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  );
}
