import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    localStorage.setItem(
      "taskly-keep-logged-in",
      keepLoggedIn ? "true" : "false",
    );

    navigate("/today");
  };

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Login screen">
        <div className="login-logo" aria-hidden="true">
          <span>✓</span>
          <span className="logo-lines">☰</span>
        </div>

        <h1 className="login-brand">Taskly</h1>
        <p className="login-tagline">Empowering your calm productivity.</p>

        <form className="login-form">
          <div className="form-heading">
            <h2>Welcome back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          <div className="field-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <div className="password-label-row">
              <label htmlFor="password">Password</label>

              <button
                className="text-link"
                type="button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <span className="input-icon">👁</span>
            </div>
          </div>

          <label className="keep-row">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(event) => setKeepLoggedIn(event.target.checked)}
            />
            <span>Keep me logged in</span>
          </label>

          {message && <p className="auth-message">{message}</p>}

          <button
            className="primary-button"
            type="button"
            onClick={handleLogin}
          >
            Login <span>→</span>
          </button>

          <div className="divider">
            <span></span>
            <p>Or continue with</p>
            <span></span>
          </div>

          <div className="social-row">
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>
        </form>

        <p className="signup-text">
          New to Taskly?{" "}
          <button
            className="signup-link"
            type="button"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </p>
      </section>
    </main>
  );
}

export default Login;
