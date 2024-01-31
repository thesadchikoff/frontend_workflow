import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskService from '../services/task/task.service'
import { CreateTaskInputs } from '../types/form.types'

type MutationAction = 'delete' | 'create'

export const useMutationTask = () => {
	const queryClient = useQueryClient()
	const {
		mutate: createMutate,
		isPending: isPendingCreate,
		isSuccess: isSuccessCreate,
	} = useMutation({
		mutationKey: ['tasks-create'],
		mutationFn: (data: CreateTaskInputs) => taskService.createTask(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		},
	})
	return {
		createMutate,
		isPendingCreate,
		isSuccessCreate,
	}
}
