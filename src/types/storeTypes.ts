import { store } from "../main";

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch