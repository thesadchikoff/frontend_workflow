export type User = {
	id: string
	username: string | unknown
	tasks: Task[]
	balance: number
}

export type Task = {
	id: number
	title: string
	description: string
	created_at: string
}
export type AuthState = {
	isLoading: boolean
	user: User | null
	error: string | unknown
}

export interface LoginResponse {
	token: string
	user: User
}

export interface LoginData {
	username: string
	password: string
}

export interface RegisterData {
	username: string
	password: string
}
