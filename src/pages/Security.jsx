import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";

function Security() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserEmail(user?.email || "");
  };

  const handleResetPassword = async () => {
    setMessage("");

    if (!userEmail) {
      setMessage("Could not find your email address.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
      redirectTo: window.location.origin,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(" Password reset email sent successfully.");
  };

  return (
    <main className="settings-page">
      <section className="settings-shell">
        <header className="edit-task-header">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/settings")}
          >
            <FiArrowLeft size={20} />
          </button>

          <h1>Account Security</h1>

          <span></span>
        </header>

        <section className="security-card">
          <div className="settings-icon purple">
            <FiShield size={22} />
          </div>

          <h2>Password Reset</h2>

          <p>
            Send a password reset email to your account address. You can use it
            to choose a new password securely.
          </p>

          <div className="security-email">{userEmail}</div>

          <button
            className="primary-button"
            type="button"
            onClick={handleResetPassword}
          >
            Send Password Reset Email
          </button>

          {message && <p className="security-message">{message}</p>}
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default Security;
