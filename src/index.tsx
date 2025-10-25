import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./App";
import "antd/dist/reset.css";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");
createRoot(container).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
