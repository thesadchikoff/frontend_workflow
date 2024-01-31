// import { createSlice } from '@reduxjs/toolkit'
// import authService from '../../services/auth/auth.service.ts'
// import userService from '../../services/user/user.service.ts'
// import { AuthState } from '../../types/auth.types.ts'

// export const initialState: AuthState = {
// 	isLoading: false,
// 	user: userService.getUserFromLocalStorage(),
// 	error: null as string | null,
// }
// const taskSlice = createSlice({
// 	name: 'auth',
// 	initialState,
// 	reducers: {
// 		logout(state) {
// 			authService.logout()
// 			state.user = null
// 		},
// 		updateProfile(state, { payload }) {
// 			state.user = payload
// 		},
// 	},
// 	extraReducers: builder => {
// 		builder.addCase(login.pending, state => {
// 			state.isLoading = true
// 			state.user = null
// 		})
// 	},
// })
// export const {} = taskSlice.actions
// export const { actions, reducer, caseReducers } = taskSlice
