import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// ✅ Expose global widget initializer
window.infiWidget = function (containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`❌ Container with ID '${containerId}' not found`);
    return;
  }

  // Clean previous render if any
  container.innerHTML = "";

  // ✅ Create root and render widget
  const root = createRoot(container);
  root.render(<App />);
  
  console.log("✅ Infi Widget rendered successfully!");
};
