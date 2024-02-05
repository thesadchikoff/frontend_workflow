import { useMutation, useQueryClient } from '@tanstack/react-query'
import { constants } from '../constants'
import taskService from '../services/task/task.service'

export const useCreateTaskMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [constants.queryKeys.CREATE_TASK],
		mutationFn: data => taskService.createTask(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [constants.queryKeys.GET_TASKS],
			})
		},
	})
}
