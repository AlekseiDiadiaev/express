import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/commonSlice'

const store = configureStore({
    reducer,
    middleware: defaultMiddleware => defaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch