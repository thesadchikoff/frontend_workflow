import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import './Textarea.scss'

interface IField {
	icon?: JSX.Element
	error?: FieldError
	placeholder?: string
}
const Textarea = forwardRef<HTMLTextAreaElement, IField>(
	({ icon, error, placeholder, ...rest }, ref) => {
		console.log(rest, 'rests')
		return (
			<div className='w-full flex flex-col gap-1 '>
				<div className={'field-item'}>
					{icon && <div>{icon}</div>}
					<textarea
						ref={ref}
						{...rest}
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

export default Textarea
