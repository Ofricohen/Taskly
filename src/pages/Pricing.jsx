import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Footer from "../components/Footer";

function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For personal task tracking.",
      features: ["Create tasks", "Sub-tasks", "Basic notifications"],
      button: "Current Plan",
    },
    {
      name: "Pro",
      price: "$6",
      description: "For focused productivity.",
      features: [
        "Advanced reminders",
        "Unlimited attachments",
        "Priority support",
      ],
      button: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Team",
      price: "$12",
      description: "For shared workspaces.",
      features: ["Team tasks", "Shared projects", "Collaboration tools"],
      button: "Choose Team",
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

          <h1>Taskly Plans</h1>

          <span></span>
        </header>

        <section className="pricing-hero">
          <h2>Choose your productivity plan</h2>
          <p>Start simple, upgrade when you need more power.</p>
        </section>

        <section className="pricing-list">
          {plans.map((plan) => (
            <article
              className={`pricing-card ${plan.highlighted ? "featured" : ""}`}
              key={plan.name}
            >
              <div>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>

              <div className="pricing-price">
                <strong>{plan.price}</strong>
                <span>/ month</span>
              </div>

              <div className="pricing-features">
                {plan.features.map((feature) => (
                  <p key={feature}>
                    <FiCheckCircle size={15} />
                    {feature}
                  </p>
                ))}
              </div>

              <button type="button">{plan.button}</button>
            </article>
          ))}
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default Pricing;
