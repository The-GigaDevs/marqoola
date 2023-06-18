import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
<Auth0ProviderWithNavigate>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
      </Auth0ProviderWithNavigate>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
