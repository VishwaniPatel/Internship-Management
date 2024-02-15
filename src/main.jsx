import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          primaryColor: "bright-blue",
          colors: {
            "bright-blue": [
              "#00488a",
              "#00488a",
              "#00488a",
              "#00488a",
              "#00488a",
              "#00488a",
              "#00488a",
              "#00488a",
              "#00488a",
              "#00488a",
            ],
          },
        }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
