import { useEffect, useRef, useState } from "react";
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
  const fileInputRef = useRef(null);

  const [task, setTask] = useState(null);
  const [subTasks, setSubTasks] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [newSubTask, setNewSubTask] = useState("");
  const [message, setMessage] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    fetchTask();
    fetchSubTasks();
    fetchAttachments();
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

  const fetchSubTasks = async () => {
    const { data, error } = await supabase
      .from("sub_tasks")
      .select("*")
      .eq("task_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      setMessage(error.message);
      return;
    }

    setSubTasks(data || []);
  };

  const fetchAttachments = async () => {
    const { data, error } = await supabase
      .from("task_attachments")
      .select("*")
      .eq("task_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setAttachments(data || []);
  };

  const handleAddSubTask = async () => {
    if (!newSubTask.trim()) {
      setMessage("Please enter a sub-task title.");
      return;
    }

    const { error } = await supabase.from("sub_tasks").insert({
      task_id: id,
      title: newSubTask,
      is_completed: false,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setNewSubTask("");
    fetchSubTasks();
  };

  const handleToggleSubTask = async (subTask) => {
    const { error } = await supabase
      .from("sub_tasks")
      .update({
        is_completed: !subTask.is_completed,
        updated_at: new Date().toISOString(),
      })
      .eq("id", subTask.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSubTasks((currentSubTasks) =>
      currentSubTasks.map((item) =>
        item.id === subTask.id
          ? { ...item, is_completed: !item.is_completed }
          : item,
      ),
    );
  };

  const handleDeleteSubTask = async (subTaskId) => {
    const { error } = await supabase
      .from("sub_tasks")
      .delete()
      .eq("id", subTaskId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSubTasks((currentSubTasks) =>
      currentSubTasks.filter((item) => item.id !== subTaskId),
    );
  };

  const handleUploadAttachment = async (event) => {
    const file = event.target.files[0];

    if (!file || !task) return;

    setMessage("");
    setUploadingFile(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in to upload files.");
      setUploadingFile(false);
      return;
    }

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${user.id}/${id}/${Date.now()}-${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("task-attachments")
      .upload(filePath, file);

    if (uploadError) {
      setMessage(uploadError.message);
      setUploadingFile(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("task-attachments")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from("task_attachments")
      .insert({
        task_id: id,
        file_name: file.name,
        file_url: publicUrlData.publicUrl,
        file_type: file.type || "file",
      });

    if (insertError) {
      setMessage(insertError.message);
      setUploadingFile(false);
      return;
    }

    event.target.value = "";
    setUploadingFile(false);
    fetchAttachments();
  };

  const handleDeleteAttachment = async (attachment) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?",
    );

    if (!confirmDelete) return;

    const { error: deleteRowError } = await supabase
      .from("task_attachments")
      .delete()
      .eq("id", attachment.id);

    if (deleteRowError) {
      setMessage(deleteRowError.message);
      return;
    }

    setAttachments((currentAttachments) =>
      currentAttachments.filter((item) => item.id !== attachment.id),
    );
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

  const completedSubTasks = subTasks.filter((item) => item.is_completed);

  if (message && !task) {
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
            <span>
              {completedSubTasks.length}/{subTasks.length} Done
            </span>
          </div>

          <div className="subtask-input-row">
            <input
              type="text"
              placeholder="Add a new sub-task..."
              value={newSubTask}
              onChange={(event) => setNewSubTask(event.target.value)}
            />

            <button type="button" onClick={handleAddSubTask}>
              Add
            </button>
          </div>

          {message && <p className="auth-message">{message}</p>}

          {subTasks.length > 0 ? (
            subTasks.map((subTask) => (
              <div
                className={`subtask-item ${
                  subTask.is_completed ? "completed" : ""
                }`}
                key={subTask.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={subTask.is_completed}
                    onChange={() => handleToggleSubTask(subTask)}
                  />
                  <span>{subTask.title}</span>
                </label>

                <button
                  type="button"
                  className="subtask-delete-btn"
                  onClick={() => handleDeleteSubTask(subTask.id)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="auth-message">No sub-tasks yet.</p>
          )}
        </section>

        <section className="attachments">
          <h3>Attachments</h3>

          <div className="attachment-grid">
            <button
              className="attachment-preview"
              type="button"
              onClick={() => fileInputRef.current.click()}
            >
              <FiPaperclip size={28} />
              <span>{uploadingFile ? "Uploading..." : "Upload file"}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleUploadAttachment}
              hidden
            />

            <div className="attachment-column">
              {attachments.length > 0 ? (
                attachments.map((attachment) => (
                  <div className="attachment-file-row" key={attachment.id}>
                    <a
                      href={attachment.file_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {attachment.file_name}
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDeleteAttachment(attachment)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <button className="attachment-file" type="button">
                  No files yet
                </button>
              )}
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
