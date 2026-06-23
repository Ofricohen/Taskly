import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Med");
  const [category, setCategory] = useState("Personal");
  const [message, setMessage] = useState("");

  const handleCreateTask = async () => {
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a task title.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("You must be logged in to create a task.");
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      user_id: user.id,
      title,
      description,
      due_date: dueDate || null,
      priority,
      category,
      status: "active",
      is_completed: false,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/today");
  };

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
            onClick={handleCreateTask}
          >
            Save
          </button>
        </header>

        <div className="add-task-form">
          <input
            className="task-title-input"
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <section className="form-card">
            <label>☰ Description</label>
            <textarea
              placeholder="Add more details about this task..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </section>

          <section className="form-card">
            <label>▣ Due Date</label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </section>

          <section className="form-card">
            <label>Priority</label>

            <div className="priority-row">
              {["Low", "Med", "High"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={priority === item ? "active" : ""}
                  onClick={() => setPriority(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="category-section">
            <label>Categories</label>

            <div className="category-row">
              {["School", "Work", "Personal", "Health"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}

              <button type="button" className="add-category">
                +
              </button>
            </div>
          </section>

          {message && <p className="auth-message">{message}</p>}

          <button
            className="create-task-btn"
            type="button"
            onClick={handleCreateTask}
          >
            ⊙ Create New Task
          </button>
        </div>
      </section>
    </main>
  );
}

export default AddTask;
