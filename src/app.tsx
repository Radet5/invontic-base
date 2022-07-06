import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

import "./assets/reset.css";
import "./assets/sass/index.scss";
