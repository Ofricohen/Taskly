import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

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
              />
            </div>
          </div>

          <button
            className="primary-button register-button"
            type="button"
            onClick={() => navigate("/today")}
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
