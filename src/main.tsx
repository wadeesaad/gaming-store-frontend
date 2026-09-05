import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ReservationProvider } from "./context/ReservationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReservationProvider>
      <App />
    </ReservationProvider>
  </StrictMode>
);