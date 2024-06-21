import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import { UserProvider } from "./UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
