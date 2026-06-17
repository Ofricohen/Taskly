import { FiCheckSquare } from "react-icons/fi";

function LoadingScreen() {
  return (
    <main className="loading-page">
      <section className="loading-shell">
        <div className="loading-logo">
          <FiCheckSquare size={32} />
        </div>

        <h1>Taskly</h1>

        <div className="loading-spinner"></div>

        <h2>Loading your tasks ...</h2>

        <p>Getting things ready for a productive day</p>
      </section>
    </main>
  );
}

export default LoadingScreen;
