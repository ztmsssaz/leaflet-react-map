// store.ts
import {configureStore} from '@reduxjs/toolkit'
import mapReducer from './slices/mapSlice'

export const store = configureStore({
  reducer: {
    maps: mapReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
