import Logo from '../../ui/logo/index.tsx'

export const Header = () => {
	return (
		<header
			className={
				'flex-grow-0 w-full h-[60px] py-2 bg-[#0F1623] flex items-center px-10 justify-between'
			}
		>
			<Logo isReturned={true} />
		</header>
	)
}
