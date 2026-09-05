import { Link } from "react-router-dom";
import { LayoutDashboard, Gamepad2, CalendarDays,MonitorPlay } from "lucide-react";

function Sidebar() {
  return (
    <nav className="w-56 h-screen bg-gray-950 text-white p-5 border-r border-gray-800">

      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600">
            <Gamepad2 size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Game Room</h1>
            <p className="text-gray-500 text-xs">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ul className="space-y-3">

        <li>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg
                       bg-blue-600 shadow-lg shadow-blue-600/20
                       hover:bg-blue-700 transition"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/RoomPage"
            className="flex items-center gap-3 px-4 py-3 rounded-lg
                       text-gray-300 hover:bg-gray-800 hover:text-white
                       transition"
          >
           <MonitorPlay size={20} />
            <span>Rooms</span>
          </Link>
        </li>

        <li>
          <Link
            to="/ReservationsPage"
            className="flex items-center gap-3 px-4 py-3 rounded-lg
                       text-gray-300 hover:bg-gray-800 hover:text-white
                       transition"
          >
            <CalendarDays size={20} />
            <span>Reservations</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Sidebar;