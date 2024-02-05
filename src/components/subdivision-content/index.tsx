import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { MySubdivision } from '../../@types/subdivision'
import Admin from '../../assets/king.svg'
import { constants } from '../../constants'
import { useDeleteTaskMutation } from '../../hooks/useDeleteTaskMutation'
import subdivisionService from '../../services/subdivision/subdivision.service'
import SectionHeader from '../section-header'
import TaskItem from '../task-item'
import styles from './SubdivisionContent.module.scss'

const SubdivisionContent = () => {
	const { data, isLoading, isSuccess } = useQuery<MySubdivision>({
		queryKey: [constants.queryKeys.MY_SUBDIVISION],
		queryFn: subdivisionService.getMySubdivision,
	})
	const { mutate } = useDeleteTaskMutation()
	console.log(data)
	if (isLoading) {
		return (
			<div className='w-full h-full flex flex-col items-center justify-center'>
				<span>Загрузка...</span>
			</div>
		)
	}

	if (isSuccess) {
		return (
			<div className='w-full h-full flex flex-col gap-10'>
				<div className='py-5 px-10 bg-[#0F1623] rounded-xl'>
					<h1 className='text-xl font-bold'>
						Отдел {data.subdivision.subdivision_name}
					</h1>
					<span className='text-xs opacity-50'>
						Руководитель - {data.subdivision.owner.username}
					</span>
				</div>
				<div className=''>
					<SectionHeader title='Коллеги' />
					<div className='grid grid-cols-4 gap-10'>
						{data.subdivision.employers.map(employer => {
							return (
								<div className='bg-[#0F1623] rounded-xl p-5 flex items-center justify-between'>
									<span
										className={cn(styles.username, {
											[styles.admin]: data.subdivision.owner.id === employer.id,
										})}
									>
										{employer.username}
									</span>
									{data.subdivision.owner.id === employer.id && (
										<img title='Руководитель отдела' src={Admin} alt='' />
									)}
								</div>
							)
						})}
					</div>
				</div>
				<div>
					<SectionHeader title='Задачи отдела' />
					<div className='grid grid-cols-2 gap-10 pb-10'>
						{data.subdivision.tasks.map(task => {
							return <TaskItem task={task} />
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default SubdivisionContent
