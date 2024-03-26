import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './shared/base.css'
import App from "./app/App"

const root = ReactDOM.createRoot(document.getElementById("root")as HTMLElement ) ;
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

//appEntry
