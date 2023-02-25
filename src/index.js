import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

const container = document.getElementById("root");
const roott = createRoot(container); // createRoot(container!) if you use TypeScript

roott.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
