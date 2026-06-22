import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created successfully. Please check your email.");
  };

  return (
    <main className="login-page">
      <section
        className="login-shell register-shell"
        aria-label="Register screen"
      >
        <div className="login-logo" aria-hidden="true">
          <span>✓</span>
          <span className="logo-lines">☰</span>
        </div>

        <h1 className="login-brand">Taskly</h1>

        <p className="login-tagline register-tagline">
          Join thousands of students organized for success.
        </p>

        <form className="login-form register-form">
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <div className="input-wrapper">
              <span className="input-icon">♙</span>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="register-email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                id="register-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="register-password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">♡</span>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          </div>

          {message && <p className="auth-message">{message}</p>}

          <button
            className="primary-button register-button"
            type="button"
            onClick={handleRegister}
          >
            Create Account <span>→</span>
          </button>

          <p className="signin-text">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </p>

          <div className="divider register-divider">
            <span></span>
            <p>OR REGISTER WITH</p>
            <span></span>
          </div>

          <div className="social-row">
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>
        </form>

        <p className="terms-text">
          By creating an account, you agree to Taskly's{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </section>
    </main>
  );
}

export default Register;
