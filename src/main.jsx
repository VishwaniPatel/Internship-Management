import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";
import { variantColorResolver } from "./shared/common-components/StatusBadge.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { TotalDurationProvider } from "./shared/totalDurationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-vc2hd027zsol4r4q.us.auth0.com"
      clientId="oZmmArDMaCUUwKdQboVzIGOwPgbkcyUh"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <MantineProvider
          // Inclueded custom theme color
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
            variantColorResolver,
          }}
        >
          <TotalDurationProvider>
            <App />
          </TotalDurationProvider>
        </MantineProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
