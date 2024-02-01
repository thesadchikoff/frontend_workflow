import { Link } from 'react-router-dom'

interface AppLink {
	title: string
	to: string
	size?: 'text-xs' | 'text-lg' | 'text-xl'
}

const AppLink = ({ size, title, to }: AppLink) => {
	return (
		<Link to={to} className={`text-[#FFB46A] underline ${size}`}>
			{title}
		</Link>
	)
}

export default AppLink
