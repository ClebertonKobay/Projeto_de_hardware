import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import {
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import './styles.css'
import rootReducers from "./reducers";

import Middleware from "./Middleware";


const persistConfig = {
  key: 'projeto',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
})



// const persistor = persistStore(store)


window.addEventListener('click', (event) => {
  event.preventDefault();
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider
      store={store}
    >
      <Middleware />
    </Provider>
  </React.StrictMode>,
);
