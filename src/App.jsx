import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Today from "./pages/Today";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EmptyState from "./pages/EmptyState";
import LoadingScreen from "./pages/LoadingScreen";
import ErrorScreen from "./pages/ErrorScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/today"
          element={
            <ProtectedRoute>
              <Today />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-details/:id"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/empty-state" element={<EmptyState />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/error" element={<ErrorScreen />} />
        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
