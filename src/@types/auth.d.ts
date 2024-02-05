import { AxiosError } from 'axios'

type User = {
	id: string
	username: string
	tasks: Task[]
	balance: number
	role: string
	subdivision: {
		id: number
		name: string
	}
}

type Task = {
	id: number
	title: string
	description: string
	created_at: string
	iscomplete?: boolean
	username?: string
}
type AuthState = {
	isLoading: boolean
	user: User | null
	error: string | unknown
}

interface LoginResponse {
	token: string
	user: User
}

interface LoginData {
	username: string
	password: string
}

interface RegisterData {
	username: string
	password: string
}

interface Error extends AxiosError {}
