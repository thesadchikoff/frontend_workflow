import { XCircle } from 'lucide-react'

interface Alert {
	type?: 'success' | 'error' | 'info'
	text?: string
	setIsShow?: () => void
}

export const Alert = ({ type, setIsShow, text }: Alert) => {
	switch (type) {
		case 'success':
			return (
				<span className='rounded border border-green-700 p-4 w-full text-green-700 bg-green-700 bg-opacity-5 flex items-center justify-between'>
					{text}
					<XCircle onClick={setIsShow} />
				</span>
			)
		case 'info':
			return (
				<span className='border border-blue-700 p-4 w-full text-blue-700 bg-blue-700 bg-opacity-5 flex items-center justify-between'>
					{text}
					<XCircle onClick={setIsShow} />
				</span>
			)
		case 'error':
			return (
				<span className='border border-red-700 p-4 w-full text-red-700 bg-red-700 bg-opacity-5 flex items-center justify-between'>
					{text}
					<XCircle onClick={setIsShow} />
				</span>
			)
		default:
			return null
	}
}
