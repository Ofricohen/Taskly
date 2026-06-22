import { useNavigate, useLocation } from "react-router-dom";
import {
  FiCalendar,
  FiCheckSquare,
  FiPlusCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="footer">
      <button
        className={`footer-item ${
          location.pathname === "/today" || location.pathname === "/empty-state"
            ? "active"
            : ""
        }`}
        onClick={() => navigate("/today")}
      >
        <FiCalendar size={20} />
        <small>Today</small>
      </button>

      <button
        className={`footer-item ${
          location.pathname === "/tasks" ? "active" : ""
        }`}
        onClick={() => navigate("/tasks")}
      >
        <FiCheckSquare size={20} />
        <small>Tasks</small>
      </button>

      <button
        className={`footer-item ${
          location.pathname === "/add-task" ? "active" : ""
        }`}
        onClick={() => navigate("/add-task")}
      >
        <FiPlusCircle size={20} />
        <small>Add</small>
      </button>

      <button
        className={`footer-item ${
          location.pathname === "/settings" ? "active" : ""
        }`}
        onClick={() => navigate("/settings")}
      >
        <FiSettings size={20} />
        <small>Settings</small>
      </button>

      <button
        className={`footer-item ${
          location.pathname === "/profile" ? "active" : ""
        }`}
        onClick={() => navigate("/profile")}
      >
        <FiUser size={20} />
        <small>Profile</small>
      </button>
    </footer>
  );
}

export default Footer;
