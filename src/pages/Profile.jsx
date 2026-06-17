import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <header className="profile-header">
          <div className="brand-row">
            <div className="avatar">👩🏻</div>
            <p className="today-brand">Taskly</p>
          </div>

          <button className="icon-button">♧</button>
        </header>

        <section className="profile-hero">
          <div className="profile-photo">
            💻
            <button type="button">✎</button>
          </div>

          <h1>Alex Johnson</h1>
          <p>alex.j@taskly.design</p>
        </section>

        <section className="weekly-card">
          <div className="weekly-top">
            <h2>Weekly Progress</h2>
            <span>82% Done</span>
          </div>

          <div className="weekly-bar">
            <span></span>
          </div>

          <div className="weekly-meta">
            <p>41 Tasks Completed</p>
            <p>9 Overdue</p>
          </div>
        </section>

        <section className="profile-stats">
          <div className="stat-card">
            <span>✓</span>
            <h3>158</h3>
            <p>THIS MONTH</p>
          </div>

          <div className="stat-card blue">
            <span>ϟ</span>
            <h3>12d</h3>
            <p>STREAK</p>
          </div>
        </section>

        <section className="profile-actions">
          <button className="edit-profile-btn" type="button">
            ✍ Edit Profile <span>›</span>
          </button>

          <button className="preferences-btn" type="button">
            ⚙ Preferences <span>›</span>
          </button>

          <button
            className="logout-btn"
            type="button"
            onClick={() => navigate("/login")}
          >
            ↪ Logout
          </button>
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default Profile;
