import { useNavigate } from "react-router-dom";

function TaskDetails() {
  const navigate = useNavigate();

  return (
    <main className="details-page">
      <section className="details-shell">
        <header className="details-header">
          <button className="back-button" onClick={() => navigate("/today")}>
            ←
          </button>

          <p className="details-brand">Taskly</p>

          <button
            className="edit-button"
            onClick={() => navigate("/edit-task")}
          >
            ✎
          </button>
        </header>

        <span className="project-tag">University Project</span>

        <h1>Design System Documentation for Mobile App</h1>

        <section className="details-card">
          <p className="details-label">Deadline</p>
          <h2>02:13:36</h2>
          <p>Due Tomorrow, 10:00 AM</p>
        </section>

        <section className="details-card">
          <p className="details-label">Priority</p>
          <div className="priority-line">
            <span></span>
          </div>
          <strong>High</strong>
        </section>

        <section className="description-card">
          <h3>Description</h3>
          <p>
            Finalize all documentation for the mobile application project. This
            includes user personas, information architecture, wireframes, and
            the high fidelity design tokens.
          </p>
        </section>

        <section className="subtasks">
          <h3>Sub-tasks</h3>

          <label>
            <input type="checkbox" defaultChecked />
            Define Typography Scale
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Export Icon Set
          </label>

          <label>
            <input type="checkbox" />
            Review with Stakeholders
          </label>
        </section>

        <button
          className="complete-task-btn"
          onClick={() => navigate("/today")}
        >
          Complete Task
        </button>
      </section>
    </main>
  );
}

export default TaskDetails;
