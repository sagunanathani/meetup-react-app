import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import * as atatus from "atatus-spa";
// Initialize Atatus with your API key
atatus.config("0203e190c5fd4587ad6d3a2dee9e9595").install();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// send a test error to confirm Atatus setup
//atatus.notify(new Error("Test Atatus Setup"));
