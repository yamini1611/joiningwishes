import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import { JoiningProvider } from "./Componenets/Context/JoiningContext";

const rootElement = document.getElementById("root");

const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <JoiningProvider>
        <App />
      </JoiningProvider>
      <ToastContainer />
    </React.StrictMode>
  );
};

// Render the app
renderApp();

// Web vitals reporting
reportWebVitals();
