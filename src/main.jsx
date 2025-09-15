import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// for testing React App atatus
// import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Initialize Atatus with your API key
//atatus.config("0203e190c5fd4587ad6d3a2dee9e9595").install();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Register the service worker
serviceWorkerRegistration.register();

// send a test error to confirm Atatus setup
//atatus.notify(new Error("Test Atatus Setup"));
