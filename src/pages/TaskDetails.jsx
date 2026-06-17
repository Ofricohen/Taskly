import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiPaperclip,
  FiShare2,
  FiCalendar,
} from "react-icons/fi";

function TaskDetails() {
  const navigate = useNavigate();

  return (
    <main className="details-page">
      <section className="details-shell">
        <header className="details-header">
          <button className="back-button" onClick={() => navigate("/today")}>
            <FiArrowLeft size={20} />
          </button>

          <p className="details-brand">Taskly</p>

          <div className="details-actions">
            <button
              className="icon-button"
              onClick={() => navigate("/edit-task")}
            >
              <FiEdit2 size={16} />
            </button>

            <button className="icon-button delete">
              <FiTrash2 size={16} />
            </button>
          </div>
        </header>

        <span className="project-tag">University Project</span>

        <div className="title-row">
          <h1>Design System Documentation for Mobile App</h1>

          <div className="status-circle">
            <FiCheckCircle size={28} />
          </div>
        </div>

        <section className="details-card">
          <p className="details-label">
            <FiClock size={14} />
            Deadline
          </p>

          <h2>02:13:36</h2>

          <p>Due Tomorrow, 10:00 AM</p>
        </section>

        <section className="details-card">
          <p className="details-label">Priority</p>

          <div className="priority-wrapper">
            <div className="priority-line">
              <span></span>
            </div>

            <strong>High</strong>
          </div>
        </section>

        <section className="description-card">
          <h3>Description</h3>

          <div className="description-box">
            <p>
              Finalize all documentation for the mobile application project.
              This includes user personas, information architecture, wireframes,
              and the high fidelity design tokens. Ensure all accessibility
              standards are clearly documented.
            </p>
          </div>
        </section>

        <section className="subtasks">
          <div className="subtask-header">
            <h3>Sub-tasks</h3>
            <span>2/4 Done</span>
          </div>

          <label className="subtask-item">
            <input type="checkbox" defaultChecked />
            Define Typography Scale
          </label>

          <label className="subtask-item">
            <input type="checkbox" defaultChecked />
            Export Icon Set
          </label>

          <label className="subtask-item">
            <input type="checkbox" />
            Write Accessibility Audit
          </label>

          <label className="subtask-item">
            <input type="checkbox" />
            Review with Stakeholders
          </label>

          <button className="add-subtask-btn">+ Add Sub-task</button>
        </section>

        <section className="attachments">
          <h3>Attachments</h3>

          <div className="attachment-grid">
            <div className="attachment-preview">
              <FiPaperclip size={28} />
            </div>

            <div className="attachment-column">
              <button className="attachment-file">Brief.pdf</button>
              <button className="attachment-file">Research</button>
            </div>
          </div>
        </section>

        <div className="task-action-bar">
          <button className="action-link" type="button">
            <FiShare2 size={16} />
            <span>Share</span>
          </button>

          <button className="action-link" type="button">
            <FiCalendar size={16} />
            <span>Reschedule</span>
          </button>

          <button
            className="complete-task-btn"
            type="button"
            onClick={() => navigate("/today")}
          >
            <FiCheckCircle size={18} />
            Complete Task
          </button>
        </div>
      </section>
    </main>
  );
}

export default TaskDetails;
