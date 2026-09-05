import { places } from "../data/fakedata";
import { useReservations } from "../context/ReservationContext";
import { Gauge, MonitorPlay, CircleCheck } from "lucide-react";

function Dashboard() {
  const { reservations } = useReservations();

  const now = new Date();

  const busyCount = reservations.filter((reservation) => {
    if (reservation.status !== "Booked") {
      return false;
    }

    const start = new Date(reservation.startTime);
    const end = new Date(reservation.endTime);

    return now >= start && now < end;
  }).length;

  const totalPlaces = places.length;
  const freeCount = totalPlaces - busyCount;

  return (
    <div className="min-h-screen bg-[#06090e] p-8 text-white">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
          <Gauge size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500">
            Gaming room overview
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Total Places */}
        <div
          className="rounded-xl border border-cyan-500/20
                     border-l-4 border-l-[#00e5ff]
                     bg-[#111a28] p-6
                     shadow-lg shadow-cyan-500/5
                     hover:border-cyan-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Places
            </p>

            <MonitorPlay
              size={22}
              className="text-[#00e5ff]"
            />
          </div>

          <p className="mt-3 text-4xl font-bold text-[#00e5ff]">
            {totalPlaces}
          </p>
        </div>

        {/* Busy */}
        <div
          className="rounded-xl border border-red-500/20
                     border-l-4 border-l-[#ff5252]
                     bg-[#111a28] p-6
                     shadow-lg shadow-red-500/5
                     hover:border-red-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Busy
            </p>

            <Gauge
              size={22}
              className="text-[#ff5252]"
            />
          </div>

          <p className="mt-3 text-4xl font-bold text-[#ff5252]">
            {busyCount}
          </p>
        </div>

        {/* Free */}
        <div
          className="rounded-xl border border-green-500/20
                     border-l-4 border-l-[#00e676]
                     bg-[#111a28] p-6
                     shadow-lg shadow-green-500/5
                     hover:border-green-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Free
            </p>

            <CircleCheck
              size={22}
              className="text-[#00e676]"
            />
          </div>

          <p className="mt-3 text-4xl font-bold text-[#00e676]">
            {freeCount}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;