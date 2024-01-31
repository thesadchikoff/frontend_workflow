import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { formatDate } from '../../helpers/format-date.helper'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Task } from '../../types/auth.types'
import { IconSpace } from '../ui/icon-space'

interface TaskItem {
	task: Task
}

const TaskItem = ({ task }: TaskItem) => {
	const [isOpenPopover, setIsOpenPopover] = useState(false)
	const popoverRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const closePopover = () => {
		console.log('handle')
		setIsOpenPopover(false)
	}
	useClickOutside(popoverRef, () => {
		closePopover()
	})
	const Popover = () => {
		return (
			<div
				ref={popoverRef}
				className='flex flex-col gap-2 rounded bg-slate-700 shadow-slate-600 p-2 absolute'
			>
				<span className='flex flex-col gap-1'>
					<Edit2 />
					Редактировать
				</span>
			</div>
		)
	}
	return (
		<div className='p-5 border border-slate-700 rounded flex   flex-col relative'>
			{isOpenPopover && <Popover />}
			<div className='w-full flex items-center justify-between flex-grow-0 pb-4 border-b border-b-slate-600'>
				<h1 className='text-xl'>{task.title}</h1>
				<IconSpace
					onClick={() => setIsOpenPopover(!isOpenPopover)}
					ref={buttonRef}
				>
					<MoreHorizontal size={16} />
				</IconSpace>
			</div>
			<div className='py-4 flex-1 border-b border-b-slate-600'>
				<p className='opacity-60'>{task.description}</p>
			</div>
			<div className='pt-4 flex-grow-0 flex items-center justify-between'>
				<span className='text-xs opacity-60'>
					Создан {formatDate(task.created_at)}
				</span>
				<IconSpace>
					<Trash2 size={16} />
				</IconSpace>
			</div>
		</div>
	)
}

export default TaskItem
