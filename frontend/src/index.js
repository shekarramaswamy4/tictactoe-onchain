import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import InstallWallet from "./InstallWallet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {window.ethereum ? <App /> : <InstallWallet />}
  </React.StrictMode>
);
