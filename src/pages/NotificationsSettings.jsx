import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBell } from "react-icons/fi";
import Footer from "../components/Footer";

function NotificationsSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    overdue: true,
    dueToday: true,
    noDeadline: true,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("taskly-notification-settings");

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (key) => {
    const updatedSettings = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(updatedSettings);
    localStorage.setItem(
      "taskly-notification-settings",
      JSON.stringify(updatedSettings),
    );
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

          <h1>Notifications</h1>

          <span></span>
        </header>

        <section className="security-card">
          <div className="settings-icon purple">
            <FiBell size={22} />
          </div>

          <h2>Notification Settings</h2>
          <p>Choose which task alerts you want to see in Taskly.</p>

          <div className="notification-settings-list">
            <button type="button" onClick={() => handleToggle("overdue")}>
              <div>
                <h4>Overdue Tasks</h4>
                <p>Show alerts for tasks past their due date.</p>
              </div>
              <span className={settings.overdue ? "toggle active" : "toggle"} />
            </button>

            <button type="button" onClick={() => handleToggle("dueToday")}>
              <div>
                <h4>Tasks Due Today</h4>
                <p>Show alerts for tasks scheduled for today.</p>
              </div>
              <span
                className={settings.dueToday ? "toggle active" : "toggle"}
              />
            </button>

            <button type="button" onClick={() => handleToggle("noDeadline")}>
              <div>
                <h4>No Deadline Tasks</h4>
                <p>Show alerts for active tasks without a deadline.</p>
              </div>
              <span
                className={settings.noDeadline ? "toggle active" : "toggle"}
              />
            </button>
          </div>
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default NotificationsSettings;
