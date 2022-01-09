import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { authApi } from "./services/auth";
import { authSlice } from "./features/auth/authSlice";
import { authLocalStorageMiddleware } from "./features/auth/authLocalStorageMiddleware";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      authLocalStorageMiddleware,
    ]),
});

setupListeners(store.dispatch);

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
