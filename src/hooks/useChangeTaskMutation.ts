import { useMutation, useQueryClient } from '@tanstack/react-query'
import { constants } from '../constants'
import taskService from '../services/task/task.service'

export const useChangeTaskMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [constants.queryKeys.CHANGE_TASKS],
		mutationFn: (id: number) => taskService.completeTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [constants.queryKeys.GET_TASKS],
			})
		},
	})
}
