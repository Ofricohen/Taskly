import { useNavigate } from "react-router-dom";

function EditTask() {
  const navigate = useNavigate();

  return (
    <main className="add-task-page">
      <section className="add-task-shell">
        <header className="add-task-header">
          <button
            className="back-button"
            onClick={() => navigate("/task-details")}
          >
            ←
          </button>

          <h1>Edit Task</h1>

          <button className="save-link" onClick={() => navigate("/today")}>
            Save
          </button>
        </header>

        <div className="add-task-form">
          <input type="text" defaultValue="Finalize Marketing Deck" />

          <textarea defaultValue="Prepare and finalize the marketing presentation for the upcoming project meeting." />

          <label>Due Date</label>
          <input type="date" defaultValue="2026-06-18" />

          <label>Priority</label>
          <div className="priority-row">
            <button type="button">Low</button>
            <button type="button">Med</button>
            <button type="button" className="active">
              High
            </button>
          </div>

          <button
            className="create-task-btn"
            type="button"
            onClick={() => navigate("/today")}
          >
            Save Changes
          </button>
        </div>
      </section>
    </main>
  );
}

export default EditTask;
