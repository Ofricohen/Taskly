import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiCheckSquare,
  FiPlusCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button className="footer-item active" onClick={() => navigate("/today")}>
        <FiCalendar size={20} />
        <small>Today</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/task-details")}>
        <FiCheckSquare size={20} />
        <small>Tasks</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/add-task")}>
        <FiPlusCircle size={20} />
        <small>Add</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/settings")}>
        <FiSettings size={20} />
        <small>Settings</small>
      </button>

      <button className="footer-item" onClick={() => navigate("/profile")}>
        <FiUser size={20} />
        <small>Profile</small>
      </button>
    </footer>
  );
}

export default Footer;
