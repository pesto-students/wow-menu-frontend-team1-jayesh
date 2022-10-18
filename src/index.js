import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import persistStore from "redux-persist/es/persistStore";
import store from "./store/configureStore";
import App from "./App";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN_URL,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
