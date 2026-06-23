import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHelpCircle } from "react-icons/fi";
import Footer from "../components/Footer";

function HelpSupport() {
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "How do I create a task?",
      answer:
        "Go to the Add page, fill in the task details, choose priority and category, then click Create New Task.",
    },
    {
      question: "How do I edit a task?",
      answer:
        "Open a task details page, click the edit icon, update the task details, and save your changes.",
    },
    {
      question: "How do sub-tasks work?",
      answer:
        "Open a task details page and add smaller steps under Sub-tasks. You can mark each one as completed.",
    },
    {
      question: "How do attachments work?",
      answer:
        "Open a task details page and use the Attachments section to upload files. Uploaded files can be opened later.",
    },
    {
      question: "How do notifications work?",
      answer:
        "Taskly shows notifications for overdue tasks, tasks due today, and active tasks without deadlines.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Go to Settings, open Account Security, and click Send Password Reset Email.",
    },
  ];

  return (
    <main className="settings-page">
      <section className="settings-shell">
        <header className="edit-task-header">
          <button
            className="back-button"
            type="button"
            onClick={() => navigate("/settings")}
          >
            <FiArrowLeft size={20} />
          </button>

          <h1>Help & Support</h1>

          <span></span>
        </header>

        <section className="security-card">
          <div className="settings-icon purple">
            <FiHelpCircle size={22} />
          </div>

          <h2>Taskly Help Center</h2>
          <p>Find quick answers about using Taskly.</p>

          <div className="faq-list">
            {faqs.map((item, index) => (
              <button
                className={`faq-item ${openQuestion === index ? "active" : ""}`}
                type="button"
                key={item.question}
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? null : index)
                }
              >
                <div className="faq-question-row">
                  <strong>{item.question}</strong>
                  <span>{openQuestion === index ? "−" : "+"}</span>
                </div>

                {openQuestion === index && <p>{item.answer}</p>}
              </button>
            ))}
          </div>
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default HelpSupport;
