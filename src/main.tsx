import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

// Published v1.3
createRoot(document.getElementById("root")!).render(<App />);
