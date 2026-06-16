import { useNavigate } from "react-router-dom";

const tasks = [
  {
    id: 1,
    title: "Finalize Marketing Deck",
    time: "9:00 AM",
    priority: "High Priority",
  },
  {
    id: 2,
    title: "Weekly Sync Meeting",
    time: "11:30 AM",
    priority: "High Priority",
  },
  {
    id: 3,
    title: "Gym Session",
    time: "5:00 PM",
    priority: "Medium Priority",
  },
];

function Today() {
  const navigate = useNavigate();

  return (
    <main className="today-page">
      <section className="today-shell">
        <header className="today-header">
          <div>
            <p className="today-brand">Taskly</p>
            <h1>Good morning, Alex!</h1>
            <p>Tuesday, June 18</p>
          </div>

          <button className="icon-button">🔔</button>
        </header>

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

        <section className="task-list">
          <h3>High Priority</h3>

          {tasks.map((task) => (
            <article
              className="task-card"
              key={task.id}
              onClick={() => navigate("/task-details")}
            >
              <input type="checkbox" />

              <div className="task-content">
                <h4>{task.title}</h4>
                <p>⏰ {task.time}</p>
              </div>

              <button className="more-button">⋮</button>
            </article>
          ))}
        </section>

        <button className="floating-add" onClick={() => navigate("/add-task")}>
          +
        </button>
      </section>
    </main>
  );
}

export default Today;
