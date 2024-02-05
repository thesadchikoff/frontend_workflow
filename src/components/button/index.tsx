import cn from 'classnames'
import { HTMLAttributes } from 'react'
import styles from './Button.module.scss'

type Props = {
	title: string
	icon?: JSX.Element | null
	disable?: boolean
	type?: 'primary' | 'ghost' | 'access' | 'danger'
	size?: 'xs' | 'md' | 'lg' | 'xl'
} & HTMLAttributes<HTMLButtonElement>

const Button = ({
	icon,
	title,
	onClick,
	disable,
	type = 'primary',
	size = 'lg',
}: Props) => {
	return (
		<button
			disabled={disable}
			onClick={onClick}
			className={cn(
				styles.button,
				{ [styles.primary]: type === 'primary' },
				{ [styles.success]: type === 'access' },
				{ [styles.danger]: type === 'danger' },
				{ [styles.ghost]: type === 'ghost' },
				{ [styles.small_button]: size === 'xs' },
				{ [styles.middle_button]: size === 'md' },
				{ [styles.large_button]: size === 'lg' },
				{ [styles.xl_button]: size === 'xl' }
			)}
		>
			{icon && <i className={styles['btn-icon']}>{icon}</i>}
			<span className='flex-1'>{title}</span>
		</button>
	)
}

export default Button
