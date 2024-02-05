import { Task, User } from './auth'

interface Subdivision {
	name: string
	subdivision_id: number
	owner: number
	isinvited: boolean
}
interface TaskWithUser extends Omit<Task, 'iscomplete'> {
	username: string
}
type UserWithoutTaskAndSubdivision = Omit<User, 'tasks' | 'subdivision'>
interface SubdivisionEntity {
	id: number
	subdivision_name: string
	owner: UserWithoutTaskAndSubdivision
	employers: UserWithoutTaskAndSubdivision[]
	tasks: TaskWithUser[]
}
interface MySubdivision {
	subdivision: SubdivisionEntity
}
interface ErrorServerResponse {
	data: string
	status: number
	statusText: string
}
interface ServerError extends Error {
	response: ErrorServerResponse
}
interface Invite {
	user: {
		user_id: number
		username: string
	}
	subdivision: {
		subdivision_id: number
		subdivision_name: string
	}
}

interface AcceptUser {
	user_id: number
	subdivision_id: number
}
