import React from "react";
// import ReactDOM from "react-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import firebase from "firebase/compat/app";

const container = document.getElementById("root");
const roott = createRoot(container); // createRoot(container!) if you use TypeScript
roott.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
