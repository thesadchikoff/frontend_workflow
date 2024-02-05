import { useMutation, useQueryClient } from '@tanstack/react-query'
import { constants } from '../constants'
import taskService from '../services/task/task.service'

export const useDeleteTaskMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: [constants.queryKeys.DELETE_TASKS],
		mutationFn: (id: number) => taskService.deleteTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [constants.queryKeys.GET_TASKS],
			})
			queryClient.invalidateQueries({
				queryKey: [constants.queryKeys.MY_SUBDIVISION],
			})
		},
	})
}
