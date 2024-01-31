import Cookie from 'js-cookie'
import { httpInterceptorWithToken } from '../../api/http.interceptor'
import { User } from '../../types/auth.types'

class UserService {
	getUserFromLocalStorage() {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	}

	async getProfile() {
		const { data } = await httpInterceptorWithToken.get('get-me')
		return data.user
	}

	saveUser(user: User): void {
		localStorage.setItem('user', JSON.stringify(user))
	}

	removeUser() {
		localStorage.removeItem('user')
	}

	saveUserToken(accessToken: string) {
		Cookie.set('accessToken', accessToken)
	}

	getUserToken() {
		const accessToken = Cookie.get('accessToken')
		return accessToken ? accessToken : null
	}

	removeUserToken() {
		Cookie.remove('accessToken')
	}
}

export default new UserService()
