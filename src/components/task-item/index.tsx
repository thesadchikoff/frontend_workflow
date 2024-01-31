import { MoreHorizontal, Trash2 } from 'lucide-react'
import { formatDate } from '../../helpers/format-date.helper'
import { Task } from '../../types/auth.types'
import { IconSpace } from '../ui/icon-space'
import './TaskItem.scss'

interface TaskItem {
	task: Task
	deleteButtonAction?: () => void
}

const TaskItem = ({ task, deleteButtonAction }: TaskItem) => {
	return (
		<div className='task-item'>
			<div className='task-header'>
				<h1 className='text-xl'>{task.title}</h1>
				<IconSpace>
					<MoreHorizontal size={16} />
				</IconSpace>
			</div>
			<div className='task-body'>
				<p className='opacity-60'>{task.description}</p>
			</div>
			<div className='task-footer'>
				<span className='text-xs opacity-60'>
					Создан {formatDate(task.created_at)}
				</span>
				<IconSpace onClick={deleteButtonAction}>
					<Trash2 size={16} />
				</IconSpace>
			</div>
		</div>
	)
}

export default TaskItem
