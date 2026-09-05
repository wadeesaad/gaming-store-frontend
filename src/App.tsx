
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoomPage from "./pages/Room";
import ReservationsPage from "./pages/Reservations";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-900">
                <Sidebar />

                <div className="p-6 flex-1 text-white">
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* ================= ROOM ================= */}
        <Route
          path="/RoomPage"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-900">
                <Sidebar />

                <div className="p-6 flex-1 text-white">
                  <RoomPage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* ================= RESERVATIONS ================= */}
        <Route
          path="/ReservationsPage"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-900">
                <Sidebar />

                <div className="p-6 flex-1 text-white">
                  <ReservationsPage />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* ================= UNKNOWN URL ================= */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

