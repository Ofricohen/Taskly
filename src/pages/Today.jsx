import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";
import { FiBell, FiClock, FiMoreVertical, FiPlus } from "react-icons/fi";

function Today() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data || []);
  };

  const completedTasks = tasks.filter((task) => task.is_completed);
  const activeTasks = tasks.filter((task) => !task.is_completed);

  const highTasks = tasks.filter(
    (task) => task.priority?.toLowerCase() === "high",
  );

  const mediumTasks = tasks.filter(
    (task) =>
      task.priority?.toLowerCase() === "med" ||
      task.priority?.toLowerCase() === "medium",
  );

  const lowTasks = tasks.filter(
    (task) => task.priority?.toLowerCase() === "low",
  );

  const renderTask = (task) => {
    const priorityClass = task.priority?.toLowerCase();

    return (
      <article
        className={`task-card ${priorityClass} ${
          task.is_completed ? "completed" : ""
        }`}
        key={task.id}
        onClick={() => navigate(`/task-details/${task.id}`)}
      >
        <input
          type="checkbox"
          checked={task.is_completed}
          readOnly
          className={`task-checkbox ${priorityClass}`}
          onClick={(event) => event.stopPropagation()}
        />

        <div className="task-content">
          <h4>{task.title}</h4>

          <div className="task-meta">
            <span className="task-time">
              <FiClock size={12} />
              {task.due_date
                ? new Date(task.due_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No due time"}
            </span>

            <span className={`task-tag ${priorityClass}`}>{task.priority}</span>
          </div>
        </div>

        <button
          className="more-button"
          type="button"
          onClick={(event) => event.stopPropagation()}
        >
          <FiMoreVertical size={18} />
        </button>
      </article>
    );
  };

  return (
    <main className="today-page">
      <section className="today-shell">
        <header className="today-header">
          <div className="brand-row">
            <div className="avatar">👩🏻</div>
            <p className="today-brand">Taskly</p>
          </div>

          <button className="icon-button" type="button">
            <FiBell size={18} />
          </button>
        </header>

        <section className="today-title">
          <h1>Good morning, Ofri!</h1>
          <p>{new Date().toLocaleDateString()}</p>
        </section>

        <section className="progress-card">
          <p>DAILY GOAL</p>
          <h2>{activeTasks.length} Active Tasks</h2>

          <div className="progress-bar">
            <span></span>
          </div>
        </section>

        <section className="task-summary-card">
          <div className="circle-progress">
            {completedTasks.length}/{tasks.length}
          </div>
          <p>Tasks Completed</p>
        </section>

        {highTasks.length > 0 && (
          <section className="task-section">
            <div className="section-title high">
              <span></span>
              <h3>High Priority</h3>
            </div>

            {highTasks.map(renderTask)}
          </section>
        )}

        {mediumTasks.length > 0 && (
          <section className="task-section">
            <div className="section-title medium">
              <span></span>
              <h3>Medium Priority</h3>
            </div>

            {mediumTasks.map(renderTask)}
          </section>
        )}

        {lowTasks.length > 0 && (
          <section className="task-section">
            <div className="section-title low">
              <span></span>
              <h3>Low Priority</h3>
            </div>

            {lowTasks.map(renderTask)}
          </section>
        )}

        <button
          className="floating-add"
          type="button"
          onClick={() => navigate("/add-task")}
        >
          <FiPlus size={28} />
        </button>

        <Footer />
      </section>
    </main>
  );
}

export default Today;
