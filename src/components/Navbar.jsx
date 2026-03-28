import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const handleClick = (section) => {
    setActive(section);
  };

  return (
    <nav className="navbar">
      <div className="logo">SaaS</div>
      <ul>
        <li
          className={active === "home" ? "active" : ""}
          onClick={() => handleClick("home")}
        >
          <a href="#home">Home</a>
        </li>
        <li
          className={active === "about" ? "active" : ""}
          onClick={() => handleClick("about")}
        >
          <a href="#about">About</a>
        </li>
        <li
          className={active === "service" ? "active" : ""}
          onClick={() => handleClick("service")}
        >
          <a href="#service">Service</a>
        </li>
        <li
          className={active === "pricing" ? "active" : ""}
          onClick={() => handleClick("pricing")}
        >
          <a href="#pricing">Pricing</a>
        </li>
        <li
          className={active === "contact" ? "active" : ""}
          onClick={() => handleClick("contact")}
        >
          <a href="#contact">Contact</a>
        </li>
        <li className="download">
          <a href="#download">Download</a>
        </li>
      </ul>
    </nav>
  );
}