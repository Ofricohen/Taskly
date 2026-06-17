import { useNavigate } from "react-router-dom";
import { FiHelpCircle, FiRefreshCw } from "react-icons/fi";
import errorImage from "../assets/error-screen.png";

function ErrorScreen() {
  const navigate = useNavigate();

  return (
    <main className="error-page">
      <section className="error-shell">
        <header className="error-header">
          <h1>Taskly</h1>

          <button className="help-button" type="button">
            <FiHelpCircle size={18} />
          </button>
        </header>

        <div className="error-image">
          <img src={errorImage} alt="Error illustration" />
        </div>

        <h2>Something went wrong</h2>

        <p className="error-message">
          We're having trouble loading your tasks.
          <br />
          Please check your internet connection
          <br />
          and try again.
        </p>

        <button
          className="retry-btn"
          type="button"
          onClick={() => navigate("/loading")}
        >
          <FiRefreshCw size={16} />
          Retry
        </button>

        <button
          className="home-btn"
          type="button"
          onClick={() => navigate("/today")}
        >
          Go back to Home
        </button>

        <div className="error-code">
          <span className="error-dot"></span>
          ERROR CODE: E-404-NETWORK
        </div>
      </section>
    </main>
  );
}

export default ErrorScreen;
