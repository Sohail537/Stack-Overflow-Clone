import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware, compose, } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";
import Chatbot from './components/ChatBot/Chatbot';
import { QueryClientProvider, QueryClient } from "react-query";

const store = legacy_createStore(Reducers, compose(applyMiddleware(thunk)));

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
    <Chatbot />
  </Provider>
);
