import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Optional: Your CSS file for global styles
import App from "./App"; // Importing the Dashboard component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
