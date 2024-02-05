import { CheckCircle2, Clock, Link, Trash2 } from 'lucide-react'
import { formatDate } from '../../helpers/format-date.helper'

import { Task } from '../../@types/auth'
import { IconSpace } from '../ui/icon-space'
import './TaskItem.scss'

interface TaskItem {
	task: Task
	deleteButtonAction?: () => void
	completeButtonAction?: () => void
}

const TaskItem = ({
	task,
	deleteButtonAction,
	completeButtonAction,
}: TaskItem) => {
	const GetStatus = () => {
		if (task.iscomplete) {
			return (
				<span className='flex items-center gap-2 w-max px-4 py-1 bg-green-300 text-green-500 bg-opacity-10 rounded text-xs'>
					<CheckCircle2 size={12} />
					Выполнено
				</span>
			)
		}
		return (
			<span className='flex items-center gap-2 w-max px-4 py-1 bg-orange-300 text-orange-500 bg-opacity-10 rounded text-xs'>
				<Clock size={12} />В процессе
			</span>
		)
	}
	return (
		<div className='task-item'>
			<div className='task-header'>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center gap-5'>
						<h1 className='text-xl'>{task.title}</h1>
						{task?.username && (
							<span className='text-xs flex items-center gap-2  opacity-50'>
								<Link size={12} />
								Автор {task.username}
							</span>
						)}
					</div>
					<GetStatus />
				</div>
				{completeButtonAction && (
					<IconSpace onClick={completeButtonAction}>
						<CheckCircle2 size={16} />
					</IconSpace>
				)}
			</div>
			<div className='task-body'>
				<p className='opacity-60'>{task.description}</p>
			</div>
			<div className='task-footer'>
				<span className='text-xs opacity-60'>
					Создан {formatDate(task.created_at)}
				</span>
				{deleteButtonAction && (
					<IconSpace onClick={deleteButtonAction}>
						<Trash2 size={16} />
					</IconSpace>
				)}
			</div>
		</div>
	)
}

export default TaskItem
