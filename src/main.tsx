import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import createSagaMiddleware from 'redux-saga'

import './styles.css'
import rootReducers from "./reducers";
import Configs from "./screens/configs";
import Login from "./screens/login";
import Register from "./screens/register";
import rootSaga from "./sagas/userSaga";

const persistConfig = {
  key: 'projeto',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

sagaMiddleware.run(rootSaga)


const persistor = persistStore(store)

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
  {
    path:'/config',
    element:<Configs/>
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/register',
    element:<Register />
  },
]);

window.addEventListener('click', (event) => {
  event.preventDefault();
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider
      store={store}
    >
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
