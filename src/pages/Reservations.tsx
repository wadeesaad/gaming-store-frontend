
import { useState } from "react";
import { places } from "../data/fakedata";
import { useReservations } from "../context/ReservationContext";
import { CalendarDays, Plus, X } from "lucide-react";

const priceMap: Record<string, number> = {
  PC: 2,
  PlayStation: 2,
  Billiard: 5,
  Foosball: 3,
  RacingSim: 5,
};

function Reservations() {
  const {
    reservations,
    addReservation,
    cancelReservation,
  } = useReservations();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [placeId, setPlaceId] = useState(places[0].id);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Cancel reservation
  async function handleCancelReservation(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelReservation(id);
    } catch (error) {
      console.error("Failed to cancel reservation:", error);
      alert("Failed to cancel reservation.");
    }
  }

  // Add reservation
  async function handleAddReservation() {
    const selectedPlace = places.find(
      (p) => p.id === placeId
    );

    // Check required fields
    if (
      !selectedPlace ||
      !customerName.trim() ||
      !customerPhone.trim() ||
      !startTime ||
      !endTime
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    // Check date/time
    if (isNaN(start) || isNaN(end)) {
      alert("Please enter valid start and end times.");
      return;
    }

    if (end <= start) {
      alert("End time must be after start time.");
      return;
    }

    // Check if the place is already booked
    const isAlreadyBooked = reservations.some(
      (reservation) => {
        if (
          reservation.placeId !== placeId ||
          reservation.status !== "Booked"
        ) {
          return false;
        }

        const existingStart = new Date(
          reservation.startTime
        ).getTime();

        const existingEnd = new Date(
          reservation.endTime
        ).getTime();

        return (
          start < existingEnd &&
          end > existingStart
        );
      }
    );

    if (isAlreadyBooked) {
      alert(
        `${selectedPlace.label} is already booked during this time.`
      );
      return;
    }

    // Calculate price
    const hours =
      (end - start) / (1000 * 60 * 60);

    const pricePerHour =
      priceMap[selectedPlace.type] || 0;

    const calculatedPrice =
      hours * pricePerHour;

    try {
      // Backend will find/create the customer
      // and save the reservation to SQL Server
      await addReservation({
        placeId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        startTime,
        endTime,
        totalPrice: calculatedPrice,
      });

      // Clear form
      setCustomerName("");
      setCustomerPhone("");
      setStartTime("");
      setEndTime("");

      alert("Reservation added successfully!");
    } catch (error) {
      console.error(
        "Failed to add reservation:",
        error
      );

      alert("Failed to add reservation.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
          <CalendarDays size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Reservations
          </h1>

          <p className="text-sm text-gray-500">
            Manage your reservations
          </p>
        </div>
      </div>

      {/* Add Reservation */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">

        <h2 className="text-lg font-semibold mb-5">
          Add Reservation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* Customer Name */}
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            className="bg-gray-950 border border-gray-800
                       text-white placeholder-gray-500
                       p-3 rounded-lg
                       focus:outline-none
                       focus:border-blue-500"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone"
            value={customerPhone}
            onChange={(e) =>
              setCustomerPhone(e.target.value)
            }
            className="bg-gray-950 border border-gray-800
                       text-white placeholder-gray-500
                       p-3 rounded-lg
                       focus:outline-none
                       focus:border-blue-500"
          />

          {/* Place */}
          <select
            value={placeId}
            onChange={(e) =>
              setPlaceId(Number(e.target.value))
            }
            className="bg-gray-950 border border-gray-800
                       text-white p-3 rounded-lg
                       focus:outline-none
                       focus:border-blue-500"
          >
            {places.map((place) => (
              <option
                key={place.id}
                value={place.id}
              >
                {place.label}
              </option>
            ))}
          </select>

          {/* Start Time */}
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) =>
              setStartTime(e.target.value)
            }
            className="bg-gray-950 border border-gray-800
                       text-white p-3 rounded-lg
                       focus:outline-none
                       focus:border-blue-500"
          />

          {/* End Time */}
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) =>
              setEndTime(e.target.value)
            }
            className="bg-gray-950 border border-gray-800
                       text-white p-3 rounded-lg
                       focus:outline-none
                       focus:border-blue-500"
          />

        </div>

        {/* Add Button */}
        <button
          onClick={handleAddReservation}
          className="mt-5 flex items-center gap-2
                     px-5 py-3 bg-blue-600 rounded-lg
                     hover:bg-blue-700
                     shadow-lg shadow-blue-600/20
                     transition"
        >
          <Plus size={20} />
          Add Reservation
        </button>

      </div>

      {/* Reservations Table */}
      <div className="bg-gray-900 border border-gray-800
                      rounded-xl overflow-hidden">

        <div className="p-5 border-b border-gray-800">
          <h2 className="text-lg font-semibold">
            Reservations
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-800/50
                             text-gray-400 text-sm">

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Place
                </th>

                <th className="p-4 text-left">
                  Start
                </th>

                <th className="p-4 text-left">
                  End
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {reservations.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-gray-500"
                  >
                    No reservations yet.
                  </td>
                </tr>
              ) : (
                reservations.map((res) => {

                  const place = places.find(
                    (p) => p.id === res.placeId
                  );

                  return (
                    <tr
                      key={res.id}
                      className="border-t border-gray-800
                                 hover:bg-gray-800/40
                                 transition"
                    >

                      {/* Customer */}
                      <td className="p-4">
                        {res.customerName || "Unknown"}
                      </td>

                      {/* Phone */}
                      <td className="p-4 text-gray-400">
                        {res.customerPhone || "-"}
                      </td>

                      {/* Place */}
                      <td className="p-4">
                        {place
                          ? place.label
                          : "Unknown"}
                      </td>

                      {/* Start */}
                      <td className="p-4 text-gray-400">
                        {new Date(
                          res.startTime
                        ).toLocaleString()}
                      </td>

                      {/* End */}
                      <td className="p-4 text-gray-400">
                        {new Date(
                          res.endTime
                        ).toLocaleString()}
                      </td>

                      {/* Price */}
                      <td className="p-4 font-semibold">
                        ${Number(res.totalPrice).toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full
                                     text-sm
                                     ${
                                       res.status === "Booked"
                                         ? "bg-green-500/10 text-green-400"
                                         : "bg-red-500/10 text-red-400"
                                     }`}
                        >
                          {res.status}
                        </span>

                      </td>

                      {/* Action */}
                      <td className="p-4">

                        {res.status === "Booked" && (
                          <button
                            onClick={() =>
                              handleCancelReservation(
                                res.id
                              )
                            }
                            className="flex items-center gap-2
                                       px-3 py-2
                                       rounded-lg
                                       bg-red-500/10
                                       text-red-400
                                       hover:bg-red-500/20
                                       transition"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        )}

                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Reservations;
