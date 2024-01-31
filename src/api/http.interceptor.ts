import axios from 'axios'
import userService from '../services/user/user.service.ts'
import config from '../shared/config.ts'

export const httpInterceptor = axios.create({
	baseURL: config.baseURL,
	withCredentials: true,
})

export const httpInterceptorWithToken = axios.create({
	baseURL: config.baseURL,
	headers: {
		Authorization: `Bearer ${userService.getUserToken()}`,
	},
})
