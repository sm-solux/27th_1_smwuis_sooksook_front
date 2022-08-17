import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from './routes/redux/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    //</React.StrictMode>
);
