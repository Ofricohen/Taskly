import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <section className="forgot-shell" aria-label="Forgot password screen">
        <button className="forgot-back" onClick={() => navigate("/login")}>
          ←
        </button>

        <div className="login-logo" aria-hidden="true">
          ↻
        </div>

        <h1 className="forgot-title">Forgot Password</h1>

        <p className="forgot-text">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form className="forgot-form">
          <label htmlFor="reset-email">Email Address</label>

          <div className="input-wrapper">
            <span className="input-icon">✉</span>
            <input
              id="reset-email"
              type="email"
              placeholder="name@example.com"
            />
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/login")}
          >
            Send Reset Link ▷
          </button>
        </form>

        <button className="back-to-login" onClick={() => navigate("/login")}>
          ← Back to Login
        </button>
      </section>
    </main>
  );
}

export default ForgotPassword;
