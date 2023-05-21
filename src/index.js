import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";


const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="top-left"
          autoClose={1500}
          transition={Flip}
          closeOnClick
          pauseOnHover={false}
        />
        <PersistGate persistor={persistor}>
           <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
