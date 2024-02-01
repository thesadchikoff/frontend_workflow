import { Button } from 'evergreen-ui'

const SubdivisionPage = () => {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='p-10 flex flex-col items-center gap-5'>
				<h1>Вы пока не состоите не в одном из подразделений</h1>
				<Button title='Просмотреть доступные' />
			</div>
		</div>
	)
}

export default SubdivisionPage
