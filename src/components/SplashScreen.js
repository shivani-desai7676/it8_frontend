import logo from "../assets/logo.png";
import "./splash.css";

function SplashScreen() {
  return (
    <div className="splash-container">
      <img src={logo} alt="SnapShare Logo" className="splash-logo" />
    </div>
  );
}

export default SplashScreen;
