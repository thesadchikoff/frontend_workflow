import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Alert } from '../../components/alert'
import Button from '../../components/button'
import Modal from '../../components/modal'
import SectionHeader from '../../components/section-header'
import TaskItem from '../../components/task-item'
import Input from '../../components/ui/input'
import Textarea from '../../components/ui/textarea'
import { useMutationTask } from '../../hooks/useMutationTask'
import taskService from '../../services/task/task.service'
import { Task } from '../../types/auth.types'
import { CreateTaskInputs } from '../../types/form.types'

const TasksPage = () => {
	const { createMutate, isPendingCreate, isSuccessCreate } = useMutationTask()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid },
	} = useForm<CreateTaskInputs>({ mode: 'all' })
	const onSubmit: SubmitHandler<CreateTaskInputs> = data => {
		createMutate(data)
		reset()
		setModal(false)
	}
	const [isModal, setModal] = useState<boolean>(false)
	const onClose = () => setModal(false)
	const [isShow, setIsShow] = useState<boolean>(false)
	const queryClient = useQueryClient()
	const { data, isError, isLoading } = useQuery<Task[]>({
		queryKey: ['tasks'],
		queryFn: taskService.getTasks,
		refetchOnWindowFocus: 'always',
	})
	const {
		mutate,
		isPending,
		isSuccess: isComplete,
	} = useMutation({
		mutationKey: ['tasks-delete'],
		mutationFn: (id: number) => taskService.deleteTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		},
	})

	const GetTasks = () => {
		if (isError) {
			setIsShow(true)
			return (
				isShow && (
					<Alert
						text='Error loading tasks'
						type='error'
						setIsShow={() => setIsShow(false)}
					/>
				)
			)
		}
		if (isLoading) {
			setIsShow(true)
			return (
				isShow && (
					<Alert
						text='Tasks is loading'
						type='info'
						setIsShow={() => setIsShow(false)}
					/>
				)
			)
		}
		if (data) {
			return (
				<div className='grid tablet:grid-cols-1 notebook:grid-cols-2 gap-10'>
					{data.length > 0 &&
						data.map((task: Task) => {
							return (
								<TaskItem
									task={task}
									key={task.id}
									deleteButtonAction={() => mutate(task.id)}
								/>
							)
						})}
				</div>
			)
		}
		return <span>Задачи отсутствуют</span>
	}

	return (
		<div className='flex flex-col gap-10 relative'>
			<SectionHeader title='Ваши задачи' action={() => setModal(true)}>
				<span className='text-xl font-semibold'>
					Всего {data ? data.length : '0'}
				</span>
			</SectionHeader>
			<Modal
				visible={isModal}
				title='Создание задачи'
				content={
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-10'
					>
						<Input
							placeholder='Укажите название задачи'
							{...register('title', {
								required: 'Поле не должно быть пустым',
								minLength: {
									message: 'Длина поля должна составлять как минимум 3 символа',
									value: 3,
								},
							})}
							error={errors.title}
						/>
						<Textarea
							placeholder='Укажите описание задачи'
							{...register('description', {
								required: 'Поле не должно быть пустым',
								minLength: {
									message:
										'Длина поля должна составлять как минимум 10 символов',
									value: 10,
								},
							})}
							error={errors.description}
						/>
						<div className='grid grid-cols-1 w-full gap-4'>
							<Button
								title='Создать'
								disable={!isDirty || !isValid || isLoading}
							/>
						</div>
					</form>
				}
				onClose={onClose}
			/>
			<GetTasks />
		</div>
	)
}

export default TasksPage
