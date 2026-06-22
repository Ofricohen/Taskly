import {
  FiBell,
  FiMoon,
  FiShield,
  FiHelpCircle,
  FiChevronRight,
} from "react-icons/fi";
import Footer from "../components/Footer";
import UserAvatar from "../components/UserAvatar";

function Settings() {
  return (
    <main className="settings-page">
      <section className="settings-shell">
        <header className="settings-header">
          <div className="brand-row">
            <UserAvatar />
            <p className="today-brand">Taskly</p>
          </div>

          <button className="icon-button" type="button">
            <FiBell size={18} />
          </button>
        </header>

        <section className="settings-title">
          <h1>Settings</h1>
          <p>Manage your account and app preferences</p>
        </section>

        <section className="settings-card">
          <div className="settings-icon purple">
            <FiBell size={22} />
          </div>

          <h3>Notifications</h3>
          <p>Manage alerts and sounds</p>
        </section>

        <section className="settings-card">
          <div className="settings-icon blue">
            <FiMoon size={22} />
          </div>

          <h3>Theme</h3>
          <p>Current: Light Mode</p>
        </section>

        <section className="settings-list">
          <button className="settings-row" type="button">
            <div className="row-left">
              <FiShield size={20} />
              <div>
                <h4>Account Security</h4>
                <p>Password, 2FA, Sessions</p>
              </div>
            </div>

            <FiChevronRight />
          </button>

          <button className="settings-row" type="button">
            <div className="row-left">
              <FiHelpCircle size={20} />
              <div>
                <h4>Help & Support</h4>
                <p>FAQ, Contact, Documentation</p>
              </div>
            </div>

            <FiChevronRight />
          </button>
        </section>

        <section className="pro-card">
          <h2>Taskly Pro</h2>

          <p>Unlock advanced analytics and team sync.</p>

          <button type="button">Upgrade Now</button>
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
