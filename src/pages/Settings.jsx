import { useEffect, useState } from "react";
import {
  FiBell,
  FiMoon,
  FiSun,
  FiShield,
  FiHelpCircle,
  FiChevronRight,
} from "react-icons/fi";
import Footer from "../components/Footer";
import UserAvatar from "../components/UserAvatar";
import NotificationsButton from "../components/NotificationsButton";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

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
                <p>Reset Password </p>
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

        <Footer />
      </section>
    </main>
  );
}

export default Settings;
