import Logo from '../assets/logo.svg'

const Loading = () => {
	return (
		<div className='w-full h-full flex flex-col items-center justify-center'>
			<img src={Logo} width={50} height={50} alt='' className='animate-spin' />
		</div>
	)
}

export default Loading
