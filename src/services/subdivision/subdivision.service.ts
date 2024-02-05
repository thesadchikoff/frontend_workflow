import axios from 'axios'
import { toaster } from 'evergreen-ui'
import { Invite, Subdivision } from '../../@types/subdivision'
import { createAxiosClient } from '../../api/http.interceptor'
import config from '../../shared/config'
import userService from '../user/user.service'

class SubdivisionService {
	async getSubdivisions() {
		try {
			const { data } = await axios.get(`${config.baseURL}all-subdivisions`, {
				headers: {
					Authorization: `Bearer ${userService.getUserToken()}`,
				},
			})
			return data
		} catch (error) {
			return error
		}
	}

	async getInvites() {
		const client = createAxiosClient()
		const { data } = await client.get('invited-list')
		return data
	}

	async getInviteToSubdivision(subdivision: Subdivision) {
		try {
			const { data } = await axios.get(
				`${config.baseURL}request-invite/${subdivision.subdivision_id}`,
				{
					headers: {
						Authorization: `Bearer ${userService.getUserToken()}`,
					},
				}
			)
			toaster.notify(
				`Вы отправили заявку на вступление в отдел ${subdivision.name}`
			)
			return data
		} catch (error) {
			return error
		}
	}
	async acceptUser(acceptUserData: Invite) {
		const client = createAxiosClient()
		const { data } = await client.post('accept-user', {
			user_id: acceptUserData.user.user_id,
			subdivision_id: acceptUserData.subdivision.subdivision_id,
		})
		return data
	}

	async getMySubdivision() {
		const client = createAxiosClient()
		const { data } = await client.get('my-subdivision')
		return data
	}

	async deleteReq(deleteData: Invite) {
		const client = createAxiosClient()
		const { data } = await client.get(`delete-req/${deleteData.user.user_id}`)
		return data
	}
}

export default new SubdivisionService()
