import { useNavigate } from "react-router-dom";

function AddTask() {
  const navigate = useNavigate();

  return (
    <main className="add-task-page">
      <section className="add-task-shell">
        <header className="add-task-header">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/today")}
          >
            ←
          </button>

          <h1>Create Task</h1>

          <button
            className="save-link"
            type="button"
            onClick={() => navigate("/today")}
          >
            Save
          </button>
        </header>

        <div className="add-task-form">
          <input
            className="task-title-input"
            type="text"
            placeholder="What needs to be done?"
          />

          <section className="form-card">
            <label>☰ Description</label>
            <textarea placeholder="Add more details about this task..." />
          </section>

          <section className="form-card">
            <label>▣ Due Date</label>
            <input type="date" />
          </section>

          <section className="form-card">
            <label> Priority </label>

            <div className="priority-row">
              <button type="button">Low</button>
              <button type="button" className="active">
                Med
              </button>
              <button type="button">High</button>
            </div>
          </section>

          <section className="category-section">
            <label> Categories</label>

            <div className="category-row">
              <button type="button">School</button>
              <button type="button">Work</button>
              <button type="button" className="active">
                Personal
              </button>
              <button type="button" className="add-category">
                +
              </button>
            </div>
          </section>

          <button
            className="create-task-btn"
            type="button"
            onClick={() => navigate("/today")}
          >
            ⊙ Create New Task
          </button>
        </div>
      </section>
    </main>
  );
}

export default AddTask;
