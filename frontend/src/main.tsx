import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/app/store";
import { restoreCSRF } from "@/lib/csrf";
import ErrorBoundary from "@/components/ErrorBoundary";
import App from "./App";
import "./index.css";

function renderApplication() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApplication).catch(renderApplication);
} else {
  renderApplication();
}
