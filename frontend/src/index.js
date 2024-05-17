// frontend/src/index.js

import React from "react";
import { createRoot } from "react-dom/client"; // Update import statement
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
