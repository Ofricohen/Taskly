import { useEffect, useState } from "react";
import {
  FiBell,
  FiMoon,
  FiSun,
  FiShield,
  FiHelpCircle,
  FiChevronRight,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";
import Footer from "../components/Footer";
import UserAvatar from "../components/UserAvatar";
import NotificationsButton from "../components/NotificationsButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Settings() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("Suggestion");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("taskly-theme") || "light";

    setTheme(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("taskly-theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
  };

  const handleSubmitFeedback = async () => {
    setFeedbackStatus("");

    if (!feedbackMessage.trim()) {
      setFeedbackStatus("Please write your feedback first.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setFeedbackStatus("You must be logged in to send feedback.");
      return;
    }

    const { error } = await supabase.from("feedback").insert({
      user_id: user.id,
      type: feedbackType,
      message: feedbackMessage,
    });

    if (error) {
      setFeedbackStatus(error.message);
      return;
    }

    setFeedbackStatus("Thanks! Your feedback was sent.");
    setFeedbackMessage("");
    setFeedbackType("Suggestion");

    setTimeout(() => {
      setIsFeedbackOpen(false);
      setFeedbackStatus("");
    }, 1200);
  };

  return (
    <main className="settings-page">
      <section className="settings-shell">
        <header className="settings-header">
          <div className="brand-row">
            <UserAvatar />
            <p className="today-brand">Taskly</p>
          </div>

          <NotificationsButton />
        </header>

        <section className="settings-title">
          <h1>Settings</h1>
          <p>Manage your account and app preferences</p>
        </section>

        <section
          className="settings-card"
          onClick={() => navigate("/notifications")}
        >
          <div className="settings-icon purple">
            <FiBell size={22} />
          </div>

          <h3>Notifications</h3>
          <p>Manage alerts and sounds</p>
        </section>

        <button
          className="settings-card theme-card-button"
          type="button"
          onClick={handleToggleTheme}
        >
          <div className="settings-icon blue">
            {theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
          </div>

          <h3>Theme</h3>
          <p>Current: {theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
        </button>

        <section className="settings-list">
          <button
            className="settings-row"
            type="button"
            onClick={() => navigate("/security")}
          >
            <div className="row-left">
              <FiShield size={20} />
              <div>
                <h4>Account Security</h4>
                <p>Reset Password</p>
              </div>
            </div>

            <FiChevronRight />
          </button>

          <button
            className="settings-row"
            type="button"
            onClick={() => navigate("/help-support")}
          >
            <div className="row-left">
              <FiHelpCircle size={20} />
              <div>
                <h4>Help & Support</h4>
                <p>Taskly Help Center</p>
              </div>
            </div>

            <FiChevronRight />
          </button>

          <button
            className="settings-row"
            type="button"
            onClick={() => setIsFeedbackOpen(true)}
          >
            <div className="row-left">
              <FiMessageCircle size={20} />
              <div>
                <h4>Send Feedback</h4>
                <p>Share bugs, ideas, or questions</p>
              </div>
            </div>

            <FiChevronRight />
          </button>
        </section>

        <section className="pro-card" onClick={() => navigate("/pricing")}>
          <h2>Taskly Pro</h2>
          <p>Unlock advanced analytics and team sync.</p>
          <button type="button">View Plans</button>
        </section>

        <section className="settings-version">
          <p>Taskly Version 2.4.0</p>
          <span>Crafted for Efficient Living</span>
        </section>

        {isFeedbackOpen && (
          <div className="feedback-overlay">
            <section className="feedback-modal">
              <header className="feedback-header">
                <div>
                  <h2>Send Feedback</h2>
                  <p>Help us improve Taskly.</p>
                </div>

                <button
                  className="feedback-close"
                  type="button"
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  <FiX size={20} />
                </button>
              </header>

              <label>Type</label>
              <select
                value={feedbackType}
                onChange={(event) => setFeedbackType(event.target.value)}
              >
                <option>Suggestion</option>
                <option>Bug</option>
                <option>Question</option>
              </select>

              <label>Message</label>
              <textarea
                placeholder="What should we improve?"
                value={feedbackMessage}
                onChange={(event) => setFeedbackMessage(event.target.value)}
              />

              {feedbackStatus && (
                <p className="feedback-status">{feedbackStatus}</p>
              )}

              <div className="feedback-actions">
                <button
                  className="feedback-cancel"
                  type="button"
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="feedback-submit"
                  type="button"
                  onClick={handleSubmitFeedback}
                >
                  Submit
                </button>
              </div>
            </section>
          </div>
        )}

        <Footer />
      </section>
    </main>
  );
}

export default Settings;
