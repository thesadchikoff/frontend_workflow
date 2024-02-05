import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toaster } from 'evergreen-ui'
import { Check, Users, X } from 'lucide-react'
import SectionHeader from '../../components/section-header'
import { IconSpace } from '../../components/ui/icon-space'
import { constants } from '../../constants'
import subdivisionService from '../../services/subdivision/subdivision.service'

const InvitesPage = () => {
	const queryClient = useQueryClient()
	const { data, isError, isLoading, isSuccess, error } = useQuery<
		Invite[],
		ServerError
	>({
		queryKey: [constants.queryKeys.INVITES],
		queryFn: subdivisionService.getInvites,
	})
	const { mutate: mutateInvite, error: mutateError } = useMutation({
		mutationKey: [constants.queryKeys.ACCEPT_INVITE],
		mutationFn: subdivisionService.acceptUser,
		onError() {
			toaster.danger(error?.response.data)
		},
		onSuccess(info) {
			console.log(info)
			queryClient.invalidateQueries({ queryKey: [constants.queryKeys.INVITES] })
		},
	})
	const { mutate: mutateDelete, error: mutateDeleteError } = useMutation({
		mutationKey: [constants.queryKeys.ACCEPT_INVITE],
		mutationFn: subdivisionService.deleteReq,
		onError() {
			toaster.danger(error?.response.data)
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [constants.queryKeys.INVITES] })
			toaster.notify('Заявка отклонена')
		},
	})
	const GetInvites = () => {
		if (isLoading) {
			return (
				<div className='w-full h-full flex items-center justify-center'>
					<span>Загрузка заявок...</span>
				</div>
			)
		}
		if (isError) {
			return (
				<div className='w-full h-full flex items-center justify-center'>
					<span>{error.response.data}</span>
				</div>
			)
		}
		if (isSuccess && data) {
			if (data.length <= 0) {
				return (
					<div className='w-full h-full flex items-center justify-center'>
						<div className='flex items-center gap-5 opacity-50 text-xl'>
							<Users />
							<span>Заявки отсутствуют</span>
						</div>
					</div>
				)
			}
			return data.map(item => {
				return (
					<div className='grid mobile:grid-cols-1 notebook:grid-cols-2 gap-10 '>
						<div className='p-10 flex flex-col gap-5 bg-[#0F1623] rounded'>
							<div className='w-full flex items-center justify-between'>
								<span className='text-xl font-bold'>
									Заявка #{item.user.user_id}
								</span>
								<div className='flex items-center gap-5'>
									<IconSpace title='Принять' onClick={() => mutateInvite(item)}>
										<Check size={12} />
									</IconSpace>
									<IconSpace
										title='Отклонить'
										onClick={() => mutateDelete(item)}
									>
										<X size={12} />
									</IconSpace>
								</div>
							</div>
							<div>
								<span className='opacity-70'>
									Пользователь{' '}
									<strong className='text-blue-800'>
										{item.user.username}
									</strong>{' '}
									хочет присоединиться к отделу{' '}
									{item.subdivision.subdivision_name}
								</span>
							</div>
						</div>
					</div>
				)
			})
		}
	}
	console.log(data)
	return (
		<div className='flex flex-col gap-10 w-full h-full'>
			<SectionHeader title='Заявки на вступление в подразделение' />
			<GetInvites />
		</div>
	)
}

export default InvitesPage
