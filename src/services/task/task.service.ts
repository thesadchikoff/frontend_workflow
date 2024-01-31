import axios from 'axios'
import { toaster } from 'evergreen-ui'
import { httpInterceptorWithToken } from '../../api/http.interceptor'
import config from '../../shared/config'
import { Task } from '../../types/auth.types'
import { CreateTaskInputs } from '../../types/form.types'
import userService from '../user/user.service'

class TaskService {
	async getTasks() {
		try {
			const { data } = await axios.get(`${config.baseURL}my-tasks`, {
				headers: {
					Authorization: `Bearer ${userService.getUserToken()}`,
				},
			})
			return data
		} catch (error) {
			return error
		}
	}
	async createTask(dataTask: CreateTaskInputs) {
		try {
			const { data } = await axios.post<Task>(
				`${config.baseURL}create-task`,
				dataTask,
				{
					headers: {
						Authorization: `Bearer ${userService.getUserToken()}`,
					},
				}
			)
			toaster.success(`Задача ${dataTask.title} успешно создана`)
			return data
		} catch (error) {
			toaster.danger('Ошибка создания задачи')
			return error
		}
	}
	async deleteTask(id: number) {
		try {
			const { data } = await httpInterceptorWithToken.delete(
				`delete-task/${id}`
			)
			toaster.success(`Задача успешно удалена`)
			return data
		} catch (error) {
			toaster.danger('Ошибка удаления задачи')
			return error
		}
	}
}

export default new TaskService()
