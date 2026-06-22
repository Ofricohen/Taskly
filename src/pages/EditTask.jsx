import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiShoppingCart,
  FiImage,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";

function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Med");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    setTitle(data.title || "");
    setDescription(data.description || "");
    setPriority(data.priority || "Med");

    if (data.due_date) {
      const localDate = new Date(data.due_date);

      const formattedDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16);

      setDueDate(formattedDate);
    }
  };

  const handleSaveChanges = async () => {
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a task title.");
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .update({
        title,
        description,
        due_date: dueDate || null,
        priority,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate(`/task-details/${id}`);
  };

  return (
    <main className="edit-task-page">
      <section className="edit-task-shell">
        <header className="edit-task-header">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate(`/task-details/${id}`)}
          >
            <FiArrowLeft size={20} />
          </button>

          <h1>Edit Task</h1>

          <span></span>
        </header>

        <form className="edit-task-form">
          <label>What needs to be done?</label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label>Description</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <label>Due Date</label>

          <div className="date-field">
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />

            <FiCalendar size={20} />
          </div>

          <label>Priority</label>

          <div className="edit-priority-row">
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

          {message && <p className="auth-message">{message}</p>}

          <button
            className="save-changes-btn"
            type="button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

          <button
            className="cancel-edit-btn"
            type="button"
            onClick={() => navigate(`/task-details/${id}`)}
          >
            Cancel
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditTask;
