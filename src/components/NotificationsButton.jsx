import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { supabase } from "../lib/supabase";

function NotificationsButton() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      .eq("is_completed", false);

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data || []);
  };

  const isToday = (dateValue) => {
    if (!dateValue) return false;

    const taskDate = new Date(dateValue);
    const today = new Date();

    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  };

  const settings = JSON.parse(
    localStorage.getItem("taskly-notification-settings"),
  ) || {
    overdue: true,
    dueToday: true,
    noDeadline: true,
  };

  const overdueTasks = settings.overdue
    ? tasks.filter(
        (task) => task.due_date && new Date(task.due_date) < new Date(),
      )
    : [];

  const todayTasks = settings.dueToday
    ? tasks.filter((task) => isToday(task.due_date))
    : [];

  const noDateTasks = settings.noDeadline
    ? tasks.filter((task) => !task.due_date)
    : [];

  const notifications = [
    ...overdueTasks.map((task) => ({
      id: `overdue-${task.id}`,
      taskId: task.id,
      title: task.title,
      text: "This task is overdue.",
    })),
    ...todayTasks.map((task) => ({
      id: `today-${task.id}`,
      taskId: task.id,
      title: task.title,
      text: "This task is due today.",
    })),
    ...noDateTasks.map((task) => ({
      id: `nodate-${task.id}`,
      taskId: task.id,
      title: task.title,
      text: "This active task has no deadline.",
    })),
  ];

  const handleOpenTask = (taskId) => {
    setIsOpen(false);
    navigate(`/task-details/${taskId}`);
  };

  return (
    <div className="notifications-wrapper" ref={wrapperRef}>
      <button
        className="icon-button notification-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiBell size={18} />

        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="notifications-panel">
          <h4>Notifications</h4>

          {notifications.length > 0 ? (
            notifications.map((item) => (
              <button
                className="notification-item"
                key={item.id}
                type="button"
                onClick={() => handleOpenTask(item.taskId)}
              >
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </button>
            ))
          ) : (
            <p className="notification-empty">No notifications right now.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationsButton;
