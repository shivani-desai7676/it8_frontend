import { useState } from "react";
import axios from "axios";

export default function Register({ setEmail, setStep }) {
  const [name, setName] = useState("");
  const [email, setLocalEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  // Handle Form Submit
  const handleSubmit = async () => {
    // Basic Validation
    if (!name || !email) {
      setErrorMessage("Name and Email are required!");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    setLoading(true);

    try {
      // Send OTP API call
      await axios.post(`${API_URL}/api/auth/send-otp`, {
  name,
  email,
});

      setEmail(email); // Set email for the next step
      setStep("verify"); // Move to OTP verification step
    } catch (err) {
      setErrorMessage("Failed to send OTP. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Set loading state to false after request completion
    }
  };

  return (
    <>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setLocalEmail(e.target.value)}
        style={inputStyle}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

      {/* LOGIN LINK */}
      <p style={{ marginTop: "10px" }}>
        Already registered?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setStep("login")}
        >
          Login
        </span>
      </p>
    </>
  );
}

/* Basic Styles */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};
