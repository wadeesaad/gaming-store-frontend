import { useState } from "react";
import { rooms, places } from "../data/fakedata";
import { useReservations } from "../context/ReservationContext";
import { MonitorPlay } from "lucide-react";

function Room() {
  const [selectedRoomId, setSelectedRoomId] = useState(1);

  const { reservations } = useReservations();

  const roomPlaces = places.filter(
    (place) => place.roomid === selectedRoomId
  );

  function isPlaceBooked(placeId: number) {
    const now = new Date();

    return reservations.some((reservation) => {
      if (
        reservation.placeId !== placeId ||
        reservation.status !== "Booked"
      ) {
        return false;
      }

      const start = new Date(reservation.startTime);
      const end = new Date(reservation.endTime);

      return now >= start && now < end;
    });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
          <MonitorPlay size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">Rooms</h1>
          <p className="text-gray-500 text-sm">
            Select a room to view its places
          </p>
        </div>
      </div>

      {/* Room Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => setSelectedRoomId(room.id)}
            className={`px-5 py-3 rounded-xl border transition-all ${
              selectedRoomId === room.id
                ? "bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/20"
                : "bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800 hover:border-gray-700"
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>

      {/* Places */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {roomPlaces.map((place) => {
          const booked = isPlaceBooked(place.id);

          return (
            <div
              key={place.id}
              className={`p-5 rounded-xl border text-center transition-all ${
                booked
                  ? "bg-red-500/10 border-red-500/40 text-red-400"
                  : "bg-gray-900 border-gray-800 text-gray-200 hover:border-blue-500 hover:bg-gray-800"
              }`}
            >
              <div className="text-lg font-semibold">
                {place.label}
              </div>

              <div
                className={`mt-2 text-sm font-medium ${
                  booked ? "text-red-400" : "text-green-400"
                }`}
              >
                {booked ? "BOOKED" : "FREE"}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Room;