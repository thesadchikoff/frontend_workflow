import Coin from '../../assets/coin.svg'
import { formatNumber } from '../../helpers/format-balance.helper'
import { useAppSelector } from '../../hooks/useAppSelector'
import styles from './Profile.module.scss'
const Profile = () => {
	const user = useAppSelector(state => state.user)

	return (
		<div className='w-full h-full flex flex-col gap-10'>
			<div>
				<h1 className='mb-5 text-3xl font-bold'>Ваш профиль</h1>
				<div className='p-5 bg-[#0F1623] rounded flex items-center justify-between'>
					<h1 className='text-2xl font-bold'>{user?.username}</h1>
					<div className={styles.balance_info}>
						<span className={styles.balance_count}>
							{formatNumber(Number(user?.balance))}
						</span>
						<img src={Coin} alt='' />
					</div>
				</div>
			</div>
			{/* <div>
				<div
					className='flex items-center justify-between mb-5'
					title='Create task'
				>
					<h1 className=' text-3xl font-bold'>Ваши задачи</h1>
					<IconSpace>
						<Plus />
					</IconSpace>
				</div>
				<div className='grid desktop:grid-cols-2 notebook:grid-cols-2 tablet:grid-cols-1 mobile:grid-cols-1 gap-10 box-border'>
					{user?.tasks.map(task => {
						return <TaskItem task={task} key={task.id} />
					})}
				</div>
			</div> */}
		</div>
	)
}

export default Profile
