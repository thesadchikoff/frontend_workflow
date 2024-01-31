import { createSlice } from '@reduxjs/toolkit'
import authService from '../../services/auth/auth.service.ts'
import userService from '../../services/user/user.service.ts'
import { AuthState } from '../../types/auth.types.ts'
import { login, registerHandler } from './auth.action.ts'

export const initialState: AuthState = {
	isLoading: false,
	user: userService.getUserFromLocalStorage(),
	error: null as string | null,
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			authService.logout()
			state.user = null
		},
		updateProfile(state, { payload }) {
			state.user = payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
				state.user = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				console.log('From action -> ', action)
				state.user = action.payload
				state.error = null
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
				state.user = null
			})
			.addCase(registerHandler.pending, state => {
				state.isLoading = true
				state.user = null
			})
			.addCase(registerHandler.fulfilled, (state, action) => {
				state.isLoading = false
				console.log('From action -> ', action)
				state.user = action.payload
				state.error = null
			})
			.addCase(registerHandler.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
				state.user = null
			})
	},
})
export const { logout, updateProfile } = authSlice.actions
export const { actions, reducer, caseReducers } = authSlice
