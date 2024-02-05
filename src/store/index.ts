import { configureStore } from '@reduxjs/toolkit'
import { reducer as initialState } from './auth/auth.slice.ts'
export const store = configureStore({
	reducer: initialState,
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
