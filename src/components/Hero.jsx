import "./Hero.css";
import heroImg from "../assets/body.png";
import { useEffect, useState } from "react";

export default function Hero({ children, goToLogin, goToRegister, goToAdmin, setStep }) {

  const [loggedIn, setLoggedIn] = useState(false);

  // Checking for a token on page load to set the logged-in status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const openProfile = () => {
    setStep("dashboard");
  };

  

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">SnapShare</div>

        <nav className="nav">
          {/* Navigation Links */}
        

          {/* LOGIN OR PROFILE BUTTON */}
          {loggedIn ? (
            <button className="header-btn" onClick={openProfile}>
              Profile
            </button>
          ) : (
            <button className="header-btn" onClick={goToLogin}>
              Login
            </button>
          )}

          {/* REGISTER BUTTON */}
          <button className="header-btn" onClick={goToRegister}>
            Register
          </button>

          {/* ADMIN BUTTON */}
          <button className="header-btn" onClick={goToAdmin}>
            Admin
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-card">
          <div className="hero-left">
            <h1>Sharing <br /> Files</h1>
            <p>Fast and secure file sharing platform.</p>

            {/* Start Button */}
            <button className="btn" onClick={goToRegister}>
              Get Started
            </button>

            <div style={{ marginTop: "20px" }}>
              {children}
            </div>
          </div>

          {/* Image on the right */}
          <div className="hero-right">
            <img src={heroImg} alt="Sharing Files" />
          </div>
        </div>
      </section>
    </>
  );
}