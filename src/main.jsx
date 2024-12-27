import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./components/AuthContext"; // Importa AuthProvider



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* Envuelve App con AuthProvider */}
      <App />
    </AuthProvider>
    
  </StrictMode>
);