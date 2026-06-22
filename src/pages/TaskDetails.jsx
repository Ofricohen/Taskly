import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { supabase } from "../lib/supabase";

function TaskDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    setMessage("");

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    setTask(data);
  };

  const handleCompleteTask = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({
        is_completed: true,
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/today");
  };

  const handleDeleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    navigate("/today");
  };

  if (message) {
    return (
      <main className="details-page">
        <section className="details-shell">
          <p className="auth-message">{message}</p>

          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/today")}
          >
            Back to Today
          </button>
        </section>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="details-page">
        <section className="details-shell">
          <p className="auth-message">Loading task...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="details-page">
      <section className="details-shell">
        <header className="details-header">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/today")}
          >
            <FiArrowLeft size={20} />
          </button>

          <p className="details-brand">Taskly</p>

          <div className="details-actions">
            <button
              className="icon-button"
              type="button"
              onClick={() => navigate(`/edit-task/${id}`)}
            >
              <FiEdit2 size={16} />
            </button>

            <button
              className="icon-button delete"
              type="button"
              onClick={handleDeleteTask}
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </header>

        <span className="project-tag">{task.priority} Priority</span>

        <div className="title-row">
          <h1>{task.title}</h1>

          <div className="status-circle">
            <FiCheckCircle size={28} />
          </div>
        </div>

        <section className="details-card">
          <p className="details-label">
            <FiClock size={14} />
            Deadline
          </p>

          <p>
            {task.due_date
              ? new Date(task.due_date).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "No deadline"}
          </p>
        </section>

        <section className="details-card">
          <p className="details-label">Priority</p>

          <div className="priority-wrapper">
            <div className="priority-line">
              <span></span>
            </div>

            <strong>{task.priority}</strong>
          </div>
        </section>

        <section className="description-card">
          <h3>Description</h3>

          <div className="description-box">
            <p>{task.description || "No description added."}</p>
          </div>
        </section>

        <section className="subtasks">
          <div className="subtask-header">
            <h3>Sub-tasks</h3>
            <span>Coming soon</span>
          </div>

          <p className="auth-message">
            Sub-tasks will be connected in a later step.
          </p>
        </section>

        <section className="attachments">
          <h3>Attachments</h3>

          <div className="attachment-grid">
            <div className="attachment-preview">
              <FiPaperclip size={28} />
            </div>

            <div className="attachment-column">
              <button className="attachment-file">No files yet</button>
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
            onClick={handleCompleteTask}
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
