import { useNavigate } from "react-router-dom";
import { FiBell, FiPlusCircle, FiUser } from "react-icons/fi";
import Footer from "../components/Footer";
import emptyStateImage from "../assets/empty-state.png";

function EmptyState() {
  const navigate = useNavigate();

  return (
    <main className="empty-page">
      <section className="empty-shell">
        <header className="empty-header">
          <div className="brand-row">
            <div className="avatar">
              <FiUser size={16} />
            </div>
            <p className="today-brand">Taskly</p>
          </div>

          <button className="icon-button" type="button">
            <FiBell size={18} />
          </button>
        </header>

        <section className="empty-content">
          <div className="empty-illustration">
            <img src={emptyStateImage} alt="No tasks illustration" />
          </div>

          <h1>No tasks yet</h1>

          <p>Start organizing your day by creating your first task.</p>

          <button
            className="empty-create-btn"
            type="button"
            onClick={() => navigate("/add-task")}
          >
            <FiPlusCircle size={20} />
            Create First Task
          </button>

          <div className="quick-templates">
            <h2>Quick Templates</h2>

            <div className="template-row">
              <button type="button">Morning Routine</button>
              <button type="button">Study Session</button>
              <button type="button">Grocery List</button>
            </div>
          </div>
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default EmptyState;
