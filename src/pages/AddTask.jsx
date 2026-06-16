import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();

  return (
    <main className="add-task-page">
      <section className="add-task-shell">
        <header className="add-task-header">
          <button className="back-button">←</button>

          <h1>Create Task</h1>

          <button className="save-link">Save</button>
        </header>

        <div className="add-task-form">
          <input type="text" placeholder="What needs to be done?" />

          <textarea placeholder="Add more details about this task..." />

          <label>Due Date</label>
          <input type="date" />

          <label>Priority</label>

          <div className="priority-row">
            <button type="button">Low</button>

            <button type="button" className="active">
              Med
            </button>

            <button type="button">High</button>
          </div>

          <button
            className="create-task-btn"
            type="button"
            onClick={() => navigate("/today")}
          >
            Create New Task
          </button>
        </div>
      </section>
    </main>
  );
}

export default AddTask;
