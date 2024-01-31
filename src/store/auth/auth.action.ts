import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/auth/auth.service.ts'
import userService from '../../services/user/user.service.ts'
import { LoginData, RegisterData } from './../../types/auth.types'

export const login = createAsyncThunk(
	'auth/user',
	async (userData: LoginData, thunkAPI) => {
		try {
			const data = await authService.login(userData)
			console.log('from login action', data)
			return data.user
		} catch (error) {
			console.log("It's error -> ", error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const registerHandler = createAsyncThunk(
	'register/user',
	async (userData: RegisterData, thunkAPI) => {
		try {
			const data = await authService.register(userData)
			console.log('from register action', data)
			return data.user
		} catch (error) {
			console.log("It's error -> ", error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const getProfile = createAsyncThunk(
	'get/profile',
	async (_, thunkAPI) => {
		try {
			const data = await userService.getProfile()
			console.log(data)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
