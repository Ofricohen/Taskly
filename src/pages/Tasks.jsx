import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiSearch, FiCheckCircle } from "react-icons/fi";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    if (filter === "active") return matchesSearch && !task.is_completed;
    if (filter === "completed") return matchesSearch && task.is_completed;

    return matchesSearch;
  });

  const activeTasks = tasks.filter((task) => !task.is_completed);
  const completedTasks = tasks.filter((task) => task.is_completed);

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
                ? new Date(task.due_date).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No due time"}
            </span>

            <span className={`task-tag ${priorityClass}`}>{task.priority}</span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="today-page">
      <section className="today-shell">
        <header className="today-header">
          <div>
            <h1>All Tasks</h1>
            <p>Your complete task list</p>
          </div>
        </header>

        <section className="task-summary-card">
          <div className="circle-progress">
            {completedTasks.length}/{tasks.length}
          </div>
          <p>Tasks Completed</p>
        </section>

        <section className="tasks-filter-card">
          <div className="search-box">
            <FiSearch size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <div className="filter-row">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All {tasks.length}
            </button>

            <button
              type="button"
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active {activeTasks.length}
            </button>

            <button
              type="button"
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Done {completedTasks.length}
            </button>
          </div>
        </section>

        <section className="task-section">
          <div className="section-title medium">
            <span></span>
            <h3>
              {filter === "all"
                ? "All Tasks"
                : filter === "active"
                  ? "Active Tasks"
                  : "Completed Tasks"}
            </h3>
          </div>

          {filteredTasks.length > 0 ? (
            filteredTasks.map(renderTask)
          ) : (
            <div className="empty-tasks-card">
              <FiCheckCircle size={28} />
              <p>No tasks found.</p>
            </div>
          )}
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default Tasks;
