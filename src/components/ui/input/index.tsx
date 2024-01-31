import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import './Input.scss'

interface IField {
	icon?: JSX.Element
	error?: FieldError
	placeholder?: string
	type?: string
}
const Input = forwardRef<HTMLInputElement, IField>(
	({ icon, error, placeholder, type = 'text', ...rest }, ref) => {
		console.log(rest, 'rests')
		return (
			<div className='w-full flex flex-col gap-1 '>
				<div className={'field-item'}>
					{icon && <div>{icon}</div>}
					<input
						ref={ref}
						{...rest}
						type={type}
						placeholder={placeholder}
						aria-invalid={error ? 'true' : 'false'}
						className={'input'}
					/>
				</div>
				<div className='w-full flex justify-start h-1'>
					{error && <p role='alert'>{error.message}</p>}
				</div>
			</div>
		)
	}
)

export default Input
