import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("Connecting...");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/health");

        setMessage(response.data.message);
      } catch (error) {
        console.error("Backend connection failed:", error);

        setError("Failed to connect to backend.");
      }
    };

    checkBackend();
  }, []);

  return (
    <div>
      <h1>Society Management System</h1>

      <p>{message}</p>

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;