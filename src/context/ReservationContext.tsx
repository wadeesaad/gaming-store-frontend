

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

import api from "../api/axios";

type Reservation = {
  id: number;
  placeId: number;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  customerId?: number;
};

type NewReservation = {
  placeId: number;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
};

type ReservationContextType = {
  reservations: Reservation[];
  addReservation: (
    reservation: NewReservation
  ) => Promise<void>;
  cancelReservation: (id: number) => Promise<void>;
  loading: boolean;
};

const ReservationContext =
  createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReservations() {
      try {
        const response = await api.get("/Reservations");

        setReservations(response.data);
      } catch (error) {
        console.error(
          "Error loading reservations:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadReservations();
  }, []);

  async function addReservation(
    reservation: NewReservation
  ) {
    try {
      const response = await api.post(
        "/Reservations",
        reservation
      );

      setReservations((current) => [
        ...current,
        response.data,
      ]);
    } catch (error) {
      console.error(
        "Error adding reservation:",
        error
      );

      throw error;
    }
  }

  async function cancelReservation(id: number) {
    try {
      await api.delete(`/Reservations/${id}`);

      setReservations((current) =>
        current.filter(
          (reservation) => reservation.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error cancelling reservation:",
        error
      );

      throw error;
    }
  }

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        cancelReservation,
        loading,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error(
      "useReservations must be used inside ReservationProvider"
    );
  }

  return context;
}

