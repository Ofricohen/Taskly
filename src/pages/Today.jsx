import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const tasks = [
  {
    id: 1,
    title: "Finalize Marketing Deck",
    time: "9:00 AM",
    category: "Work",
    priority: "high",
  },
  {
    id: 2,
    title: "Weekly Sync Meeting",
    time: "11:30 AM",
    category: "Team",
    priority: "high",
  },
  {
    id: 3,
    title: "Gym Session",
    time: "5:00 PM",
    category: "Health",
    priority: "medium",
  },
];

function Today() {
  const navigate = useNavigate();

  const highTasks = tasks.filter((task) => task.priority === "high");
  const mediumTasks = tasks.filter((task) => task.priority === "medium");

  const renderTask = (task) => (
    <article
      className={`task-card ${task.priority}`}
      key={task.id}
      onClick={() => navigate("/task-details")}
    >
      <input
        type="checkbox"
        className={`task-checkbox ${task.priority}`}
        onClick={(event) => event.stopPropagation()}
      />

      <div className="task-content">
        <h4>{task.title}</h4>

        <div className="task-meta">
          <span>⏰ {task.time}</span>
          <span className={`task-tag ${task.priority}`}>{task.category}</span>
        </div>
      </div>

      <button
        className="more-button"
        onClick={(event) => event.stopPropagation()}
      >
        ⋮
      </button>
    </article>
  );

  return (
    <main className="today-page">
      <section className="today-shell">
        <header className="today-header">
          <div className="brand-row">
            <div className="avatar">👩🏻</div>
            <p className="today-brand">Taskly</p>
          </div>

          <button className="icon-button">♧</button>
        </header>

        <section className="today-title">
          <h1>Good morning, Ofri!</h1>
          <p>Wednesday, June 17</p>
        </section>

        <section className="progress-card">
          <p>DAILY GOAL</p>
          <h2>75% Complete</h2>

          <div className="progress-bar">
            <span></span>
          </div>
        </section>

        <section className="task-summary-card">
          <div className="circle-progress">6/8</div>
          <p>Tasks Finished</p>
        </section>

        <section className="task-section">
          <div className="section-title high">
            <span></span>
            <h3>High Priority</h3>
          </div>

          {highTasks.map(renderTask)}
        </section>

        <section className="task-section">
          <div className="section-title medium">
            <span></span>
            <h3>Medium Priority</h3>
          </div>

          {mediumTasks.map(renderTask)}
        </section>

        <button className="floating-add" onClick={() => navigate("/add-task")}>
          +
        </button>

        <Footer />
      </section>
    </main>
  );
}

export default Today;
