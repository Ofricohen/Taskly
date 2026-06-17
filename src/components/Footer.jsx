import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button className="footer-item active" onClick={() => navigate("/today")}>
        <span>▣</span>
        <small>Today</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/task-details")}>
        <span>☑</span>
        <small>Tasks</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/add-task")}>
        <span>⊕</span>
        <small>Add</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/settings")}>
        <span>⚙</span>
        <small>Settings</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/profile")}>
        <span>☻</span>
        <small>Profile</small>
      </button>
    </footer>
  );
}

export default Footer;
