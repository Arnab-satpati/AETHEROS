import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/ubuntu"; // Ubuntu font
import "./index.css"; // Global styles
import '@vscode/codicons/dist/codicon.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
