import { useEffect, useState } from "react";

/* USER COMPONENTS */
import SplashScreen from "./components/SplashScreen";
import Hero from "./components/Hero";
import SendOtp from "./components/SendOtp";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";
import LoginOtp from "./components/LoginOtp";
import Dashboard from "./components/Dashboard";

/* ADMIN COMPONENTS */
import AdminLogin from "./components/admin/AdminLogin";
import AdminOtp from "./components/admin/AdminOtp";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  const [step, setStep] = useState("splash");
  const [email, setEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState(
    localStorage.getItem("admin") || ""
  );

  /* SPLASH SCREEN */
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* SPLASH */
  if (step === "splash") return <SplashScreen />;

  /* USER DASHBOARD */
  if (step === "dashboard") {
    return <Dashboard setStep={setStep} />;
  }

  /* ADMIN DASHBOARD */
  if (step === "admin-dashboard") {
    return <AdminDashboard />;
  }

  /* ADMIN LOGIN */
  if (step === "admin-login") {
    return (
      <AdminLogin
        onNext={(email) => {
          setAdminEmail(email);
          setStep("admin-otp");
        }}
      />
    );
  }

  /* ADMIN OTP */
  if (step === "admin-otp") {
    return (
      <AdminOtp
        email={adminEmail}
        onVerified={() => {
          localStorage.setItem("admin", adminEmail);
          setStep("admin-dashboard");
        }}
      />
    );
  }

  /* MAIN UI */
  return (
    <Hero
      setStep={setStep}
      goToLogin={() => setStep("login")}
      goToRegister={() => setStep("register")}
      goToAdmin={() => setStep("admin-login")}
    >
      {/* REGISTER FLOW */}
      {step === "register" && (
        <SendOtp
          onNext={(userEmail) => {
            setEmail(userEmail);
            setStep("verify");
          }}
          goToLogin={() => setStep("login")}
        />
      )}

      {step === "verify" && (
        <VerifyOtp
          email={email}
          onVerified={() => setStep("login")}
        />
      )}

      {/* LOGIN FLOW */}
      {step === "login" && (
        <Login
          onNext={(userEmail) => {
            setEmail(userEmail);
            setStep("login-otp");
          }}
        />
      )}

      {step === "login-otp" && (
        <LoginOtp
          email={email}
          onVerified={(jwtToken) => {
            // ✅ Store token in localStorage
            localStorage.setItem("token", jwtToken);

            // ❌ removed setToken (no longer needed)
            setStep("dashboard");
          }}
        />
      )}
    </Hero>
  );
}

export default App;