import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiShoppingCart,
  FiImage,
} from "react-icons/fi";

function EditTask() {
  const navigate = useNavigate();

  return (
    <main className="edit-task-page">
      <section className="edit-task-shell">
        <header className="edit-task-header">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/task-details")}
          >
            <FiArrowLeft size={20} />
          </button>

          <h1>Edit Task</h1>

          <span></span>
        </header>

        <form className="edit-task-form">
          <label>What needs to be done?</label>
          <input type="text" defaultValue="Design System Documentation" />

          <label>Description</label>
          <textarea defaultValue="Finalize all documentation for the mobile application project including the typography scale, color palette mapping, and responsive grid behaviors for the handoff session next week." />

          <label>Due Date</label>
          <div className="date-field">
            <input type="text" defaultValue="06/08/2024" />
            <FiCalendar size={20} />
          </div>

          <label>Priority</label>
          <div className="edit-priority-row">
            <button type="button">Low</button>
            <button type="button">Med</button>
            <button type="button" className="active">
              High
            </button>
          </div>

          <label>Category</label>
          <div className="edit-category-row">
            <button type="button" className="active">
              <FiBriefcase size={14} />
              Work
            </button>

            <button type="button">
              <FiUser size={14} />
              Personal
            </button>

            <button type="button">
              <FiShoppingCart size={14} />
              Health
            </button>
          </div>

          <div className="reference-card">
            <FiImage size={28} />
            <span>Reference Material</span>
          </div>

          <button
            className="save-changes-btn"
            type="button"
            onClick={() => navigate("/task-details")}
          >
            Save Changes
          </button>

          <button
            className="cancel-edit-btn"
            type="button"
            onClick={() => navigate("/task-details")}
          >
            Cancel
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditTask;
