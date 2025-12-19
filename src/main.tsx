import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

// Published v2.0 - Force Deploy
createRoot(document.getElementById("root")!).render(<App />);
